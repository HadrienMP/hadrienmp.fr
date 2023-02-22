---
title: Gherkin vs Approvals
description: Gherkin est une forme d'écriture de tests qui est très utilisée. Cette technique est vieillissante et il existe des alternatives. Comparons la avec la technique d'approbation de documentation automatique.
date: 2023-02-22T08:36:00+01:00
draft: false
---
Qu'est-ce que Gherkin ?
-----------------------
C'est une notation qui encadre l'écriture de tests en langage naturel. Si vous ne connaissez pas son petit nom, elle est reconnaissable par les mots clés "Given, When, Then". C'est la notation d'outils comme cucumber ou specflow.
En pratique voilà à quoi ça pourrait ressembler pour un cas que nous connaissons toustes :

```gherkin
Given a coupon of 10$ with a minimum of 50$ of purchase
When the shopping cart is of 50$
Then the amount billed is 40$
```
C'est chouette ! C'est lisible, on peut utiliser des caractères spéciaux, on pourrait même l'écrire en français !  

Sauf que... on peut aussi l'écrire comme ça:
```gherkin
Given a shopping cart of 50$
And a coupon for 10$ off after a 50$ purchase or more
When the coupon is applied
Then the bill is for 40$
```
On pourrait trouver encore de nombreuses autres manières d'exprimer cette règle de gestion.


Comment ça marche ?
-------------------
Une fois qu'on a défini le texte de son test en Gherkin, il faut bien le convertir en code. Les frameworks aident, mais jusqu'ici pas de magie. Il faut écrire des sortes de REGEX pour extraire les valeurs de vos phrases. Puis utiliser ces valeurs dans des appels de code. 

Donc, première conséquence, Gherkin n'économise pas de code, le code est toujours là, mais il est abstrait avec le langage naturel.

En pseudo code, sans outils, ça pourrait donner des choses comme ça
```javascript
let [couponAmount, minimumPurchase] = parse("a coupon of <couponAmount>$ with a minimum of <minimumPurchase>$ of purchase", text)
let [shoppingCartAmount] = parse("the shopping cart is of <shoppingCartAmount>$", text)
let [billedAmount] = parse("the amount billed is <billedAmount>$", text)
let coupon = new Coupon({amount: couponAmount, minimum: minimumPurchase})
let actualBilledAmount = apply(coupon, shoppingCartAmount)
expect(actualBilledAmount).toEqual(shoppingCartAmount);
```

Il faudra évidemment décliner la partie parsing autant de fois qu'on a de variantes.

Pas plus rapide, mais plus lisible
----------------------------------
La première chose que je remarque, c'est que de mon côté développeur, j'aurais été plus rapide à écrire directement le code. C'est normal. Cette technique du langage naturel par de l'intention de faire écrire ces tests à des personnes qui ne codent pas, vos expert.e.s métier par exemple. Des échos que j'ai, rares sont les équipes pour qui ça arrive. Mais même pour les devs, ça a des avantages d'écrire comme ça. La modélisation en code atteint vite ses limites. C'est pourquoi j'aime beaucoup utiliser le tableau blanc pour expliquer des concepts, des fonctionnalités, des architectures. Un test en Gherkin bien écrit peut être bien plus lisible que du code.

Si on prends l'exemple du [jeu du morpion qu'on a développé avec Thomas Carpaye](todo), nos tests ressemblent à ça
```elm
emptyGrid
  |> play X (0,0)
  |> play O (0,1)
  |> play X (1,0)
  |> play O (1,1)
  |> play X (2,0)
  |> decide
  |> Expect.equal (Win X)
```

Avec un Gherkin bien fait on pourrait avoir
```gherkin
Given the grid
|   |   |   |
| O | O |   |
| X | X |   |
When X plays on the bottom right
Then X wins
```

On est mieux là ! Bon, le parsing va pas être simple et on aurait pu faire mieux sur la lisibilité des tests, mais c'est mieux !

Le hic : reconnaitre un.e menteu.r.se
----------------------
Une des techniques de police pour reconnaitre un menteur c'est de poser la même question plusieurs fois. La personne qui ment récitera son mensonge. Elle utilise les mêmes mots, les mêmes expressions etc. 

Donc, un.e expert.e métier formulera la même règle métier de plusieurs manières différentes à chaque fois. 

Les solutions
-------------
### 1. Gérer toutes les manières d'écrire qu'on nous donne
Je passe rapidement sur celle-ci, je pense que vous pouvez imaginer facilement le volume de code impliqué. Le temps de dev pour cette solution me la rend peu attirante. Je préfère écrire directement du code.

### 2. Une seule expression par fragment de code  
Chaque fragment de code, setup, exécution, assertion, doit avoir son expression "naturelle". 

C'est la solution plus raisonnable. 
- C'est proche de la philosophie Domain Driven Design, on utilise l'ubiquitous language. 
- Ça implique beaucoup moins de code.

Mais la conséquence de cette technique c'est qu'on est plus face à du langage naturel. On a créé un nouveau de langage de programmation qu'on transpile dans notre langage sous jacent.

Ainsi, les personnes qui écriront les tests sont des devs, qu'iels le soient de formation ou non. Mais honnêtement, vous ne pourrez jamais mettre le même volume d'efforts sur l'outillage de votre nouveau langage que celui fournit sur C# ou javascript etc. 

C'est pourquoi je trouve que mettre plus d'efforts pour rendre nos tests actuels plus lisibles par des non devs est plus intéressant. On supprimer une couche de complexité.

Le challenger : approvals
=========================
Nos languages de programmation atteignent facilement leurs limites en terme d'expressivité. Ce n'est pas un hasard si nous sommes nombreux.ses à adorer le papier, le tableau blanc et les schémas. 

C'est une des raisons du succès de Gherkin je pense. En étant astucieux.ses on peut atteindre un niveau étonnant d'expressivité.

La technique d'approbation de documentation cherche les avantages de cette expressivité tout en contrant sa complexité.

Comment ça marche ? On va concevoir nos "tests" de manière à ce qu'ils produisent un fichier de documentation en sortie. Ça pourrait être du Markdown, du AsciiDoc, du graph etc.

Pas d'assertions ici. Une fois la documentation générée on la vérifie à la main et on l'approuve (en renommant le fichier en .approved par exemple). Chaque fois qu'on relancera les tests, ils compareront la documentation générée avec celle approuvée. 

Avec cette technique, je trouve qu'on atteint un niveau d'expressivité bien plus haut qu'en Gherkin. On a moins de limites à s'imposer car on on aura pas à parser notre documentation.

Mais surtout, on a un ensemble d'entrée de conversion restreint : le code. Là où Gherkin a un ensemble d'entrée très large et mal défini. 

Conclusion
==========

Je n'ai jamais été trop convaincu par Gherkin et les méthodologies autour. En revanche, j'adore la documentation visuelle. Je retrouve plus de ce qui me plaisait dans le Behaviour Driven Development avec approvals qu'avec Gherkin.

Approvals c'est aussi tacler la complexité sans forcer les expert.e.s métier à devenir devs. 

Comme d'habitude, je sais que mon opinion est controversée. La communauté aime beaucoup Gherkin et tant mieux si ça fonctionne dans vos équipes. Mais que diriez-vous de tenter la doc à l'envers pour voir ce que ça donne ?

------------------------------

Pour aller plus loin sur le sujet, cette technique d'approvals est bien expliquée par X dans Y conf. Elle est inspirée de la philosophie "living documentation" de Cyrille MARTRAIRE, n'hésitez pas à aller jeter un oeil à son livre sur le sujet. De la doc qui est toujours à jour par design, qui pourrait dire non ?
