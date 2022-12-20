---
title: Montez le niveau de votre gestion des erreurs !
description: La gestion des erreurs est une des dernières choses auxquelles nous pensons.
  On se contente de jeter une exception sans y penser. Peut-on monter le niveau?
date: 2018-01-16T13:24:18.000Z
preview: 
    url: errorManagement.webp
    description: Le coyotte de Bib bip et Coyotte assis sur une fusée qu'il va allumer. Le texte dit "what could possibly go wrong ?"
draft: false
---
Dans une de mes missions avec une architecture classique en couches et sans service de routage, j'ai eu souvent des discussions et incompréhensions avec mes collègues sur la gestion des erreurs. Plutôt que de rester dans le débat théorique, j'ai voulu essayer sur un exemple "classique" toutes les techniques auxquelles je pouvais penser. J'aimerais les partager avec vous pour avoir votre avis et peut-être encore de meilleures solutions.

C'est parti !

# Les specs
- Un utilisateur soumet un formulaire de changement d'adresse. 
- Si ce formulaire est valide, sa nouvelle adresse est envoyée au webservice en charge de l'opération.
- L'utilisateur est alors redirigé vers la page de son compte avec un message de succès.
- Si le formulaire est invalide ou que la mise à jour dans le webservice ne fonctionne pas, l'utilisateur est redirigé sur la page de mise à jour de formulaire avec un message décrivant l'erreur

# Le code
## 1. Orgie de booléens
Je commence par la pire, je crois que personne à qui j'en ai parlé trouve que c'est une bonne idée. 

```java
public Response updateAddress(Request request) {
    // La requête est une simple collection de paramètres
    UpdateAddressForm form = new UpdateAddressForm(request);

    if (form.isValid()) {
        boolean updateSucceeded = updateUserAddress(form.userId(), form.address());
        if (updateSucceeded) {
            return successResponse();
        } else {
            return failResponse("service unavailable");
        }
    } else {
        return failResponse(form.errors());
    }
}

// Je mets la définition de ces méthodes pour plus de clarté, je ne les remettrais pas par la suite.
private Response successResponse() {
    return ResponseBuilder.redirectTo(AccountPage.URL)
            .withMessage("You updated your address, congratulations !")
            .response();
}

private Response failResponse(String errors) {
    return ResponseBuilder.redirectTo(EditAddressPage.URL)
            .withMessage("Sorry your request was denied, it contained the following errors : " + errors)
            .response();
}
```
Quelques problèmes :

1. Si l'appel à updateUserAddress ne marche pas, on ne sait pas pourquoi.
2. Il y a des dépendances temporelles dans le formulaire. On peut récupérer l'identifiant et l'adresse de l'utilisateur même si le formulaire est invalide.
3. On a une duplication, certes légère, de code pour le cas en erreur. Dans les spécifications on ne distingue pas les deux cas, pourquoi le faire dans le code ?
4. Il y a deux niveaux d'indentation. Ce n'est pas énorme, mais une forte indentation peut nuire à la lisibilité.

## 2. Error String
Pour pallier au premier problème on peut retourner l'erreur ou les erreurs potentielles. Dans le cas où la méthode doit retourner une valeur, on englobe la valeur dans un objet avec les potentielles erreurs.
```java
UpdateAddressForm form = new UpdateAddressForm(request);

if (form.isValid()) {
    String errors = updateUserAddress(form.userId(), form.address());
    if (errors.isEmpty()) {
        return successResponse();
    } else {
        return failResponse(errors);
    }
} else {
    return failResponse(form.errors());
}
```
Maintenant la méthode updateUserAddress retourne des erreurs. Cette ligne n'a pas beaucoup de sens, le but de la méthode est de faire une action, pas de retourner des erreurs. Je trouve que la signature prête à confusion.
 
## 3. Exception
On peut gérer ce problème grâce aux exceptions. 
```java
UpdateAddressForm form = new UpdateAddressForm(request);

if (form.isValid()) {
    try {
        updateUserAddress(form);
        return successResponse();
    } catch (BusinessException e) {
        return failResponse(e.errors());
    }
}
return failResponse(form.errors());
```
On ne récupère plus les erreurs de la méthode en retour normal, mais le code n'est pas beaucoup plus propre. 

## 4. Plus d'exceptions !
Il nous reste les trois problèmes suivants à régler :

1. Il y a des dépendances temporelles dans le formulaire. On peut récupérer l'identifiant et l'adresse de l'utilisateur même si le formulaire est invalide.
2. On a une duplication certes légère, de code pour le cas en erreur. Dans les spécifications on ne distingue pas les deux cas, pourquoi le faire dans le code ?
3. Il y a deux niveaux d'indentation. Ce n'est pas énorme, mais une forte indentation peut nuire à la lisibilité.

Pour tous les régler, on peut lancer une exception à la création du formulaire s'il n'est pas valide.

```java
try {
    UpdateAddressForm form = UpdateAddressForm.tryToCreate(request);
    webService.updateUserAddress(form.userId(), form.address());
    return successResponse();
} catch (BusinessException e) {
    return failResponse(e);
}
```

## 5. Monades
La dernière technique à laquelle j'ai pensé est le monade Try. J'ai pris celui de la librairie better-java-monads. L'idée est que Try est une classe abstraite à deux implémentations :

- Success, qui contient le résultat de l'opération
- Failure, qui contient l'exception levée en cas d'échec

Les méthodes map n'ont d'effet que sur la classe Success. Et la méthode recover renvoie la valeur dans succès ou le résultat de la fonction en paramètre.

```java
return UpdateAddressForm.from(request) // retourne un Try<UpdateAddressForm>
        .flatMap(form -> updateUserAddress(form.userId(), form.address()))
        .map(this::successResponse)
        .recover(this::failResponse);
```
# Mon point de vue

> "Les opinions c'est comme les ~~(censuré)~~ tout le monde en a un."  
> *Inspecteur Harry*

Je trouve que la technique avec les monades est très élégante. Cependant pour le public java, je la trouve difficilement accessible. Et si une méthode dans une couche profonde renvoie un try, il est probable qu'il faille le faire remonter à travers les couches jusqu'au contrôleur, polluant ainsi toutes les signatures, comme les checked exceptions. 

Je préfère la technique des exceptions. Je trouve l'exemple de code aussi élégant. De plus il se trouve que cette technique est très bien alignée avec d'autres idées :

- Un objet invalide ne devrait jamais être créé (donc on ne crée pas de formulaire invalide)
- Pour respecter le [SRP](https://fr.wikipedia.org/wiki/Principe_de_responsabilit%C3%A9_unique) (Principe de responsabilité unique) une méthode devrait être soit commande soit requête. Les requêtes on un type de retour, les commandes sont void.

Pour que cette technique fonctionne à l'échelle d'un logiciel il faut mettre en place une bonne politique d'exceptions. Je fais en général seulement deux types : BusinessException et TechnicalException. Si une technical exception apparaît dans une appli web, on peut récupérer de l'erreur (rare) ou la laisser remonter. En la laissant remonter on peut souvent facilement diagnostiquer le problème et le corriger. Si une business exception arrive on voudra souvent afficher un message d'erreur à l'utilisateur, une erreur "normale" en quelque sorte. 

Ainsi tous les contrôleurs savent qu'ils doivent récupérer une business exception pour afficher les messages d'erreur.

On m'oppose souvent que "les exceptions c'est comme les GOTOs, c'est mal". Ce n'est pas un argument mais un jugement. Et je n'ai jamais subi de dette technique due aux GOTOs. C'est pourquoi...

# Donnez moi votre avis !

J'aimerais énormément avoir vos avis en commentaires ou sur Twitter [@HadrienMP](https://twitter.com/HadrienMP) !   

Si vous n'aimez pas la technique avec les exceptions, j'adorerais avoir l'occasion de changer d'avis !   

Quelle technique utilisez-vous d'habitude ?   

Quelle est votre technique préférée ?  

Tout le code ainsi que les tests sont disponibles sur mon github : https://github.com/HadrienMP/error-management-styles. N'hésitez pas à forker pour me proposer vos améliorations !

P.S. : Si vous voulez une très bonne conférence sur le sujet regardez [Learning to live with errors](http://videos.ncrafts.io/video/221107991)