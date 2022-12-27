---
title: Elegant Objects, le livre qui pique de Yegor Bugayenko
description: Yegor Bugayenko présente sa vision cohérente de la programmation objet.
  Principes de base déclinés en patterns de code. Est-ce que ça vaut le coup de
  le lire ?
date: 2018-04-11T12:44:31.645Z
preview: 
    url: yegor.jpg
    description: La couverture du livre qui montre un dessin de cactus.
draft: false
tags:
  - object oriented programming
  - meilleures pratiques
categories:
  - livres
keywords:
  - elegant objects
  - programmation objet
  - yegor bugayenko
---
![Le livre Elegant Objects](/images/blog/yegor.webp)
Il y a quelques temps, je suis tombé sur le blog de [Yegor Bugayenko](http://www.yegor256.com/). Son sujet d'écriture principal est la programmation orientée objet. Il y expose ses visions sur des problèmes classiques et ses solutions objet. En suivant une série de valeurs et de principes objets, il a développé un style de code particulier.

J'ai bien accroché à son blog. Il a des avis très tranchés, parfois je suis d'accord, parfois pas du tout.

Pour présenter sa vision de la programmation objet, il a sorti un livre : Elegant Objects (en deux volumes). Arolla a bien voulu le commander pour sa bibliothèque ! \o/

Mieux qu'un commentaire amazon je me suis dit que vous le présenter vous permettrai de vous faire une idée sur l'intéret (ou pas) de le lire. 

# Résumé / Spoiler
## Pour les devs occupé.e.s
Si vous voulez un **avant goût** du livre, lisez les arti qui vous chantent sur **son blog**, le livre est une compilation de plusieurs articles un peu plus développés. 

**Le ton est polémique** et les avis tranchés (c'est son style). Il y a de bons conseils, de moins bons (voire carrément mauvais xD). **Son approche de l'objet est cohérente** et justifiée. 

Avec ses 223 pages, et un contenu aéré, le livre se lit très vite (j'ai mis une journée et je ne suis pas un gros lecteur). C'est une lecture intéressante, mais ce ne serait pas le livre que je conseillerais à un débutant.

# Un peu plus sur le bonhomme
* On le trouve partout sous le pseudo Yegor256 (comme son blog)
* Son contenu est souvent référencé dans les aggrégateurs de blog comme DZone
* C'est le contributeur principal de la famille de librairies jcabi (que vous avez peut-être déja rencontré)
* Il décerne des prix de qualité de code, un des gagnants est junit-quickcheck, une librairie de property based testing en java.

# Contenu
Les chapitres sont organisés autour de la "vie" des objets. En effet, son fil rouge est la personnification de ceux-ci. Il y aborde entre autres les sujets suivants :
* Anti patterns de nommage
* Meilleures pratiques autour des constructeurs
* Meilleures pratiques de tailles d'objets et d'encapsulation
* L'immutabilité
* Les tests comme documentation et l'approche non mockiste
* Anti patterns OOP (méthodes statiques etc.)
* Meilleures pratiques de design d'API

# Ce que j'ai aimé
* Contrairement aux exemples dans Clean Code qui peuvent être assez austères et long, ici ils sont concis et facile à comprendre
* Son approche va se rapprocher beaucoup du fonctionnel
	* On compose des objets qui n'ont souvent qu'une seule fonction et qui composent d'autres objets. En appelant l'objet parent on déclenche l'évaluation de toute la grappe (pas à la construction donc).
	* Tout immutable
- La cohérence du propos.
- Les grands principes qui forgent sa vision :
	* Maintenabilité
	* Lisibilité
		* Code déclaratif -> pour atteindre des bénéfices comme le partage avec le métier
	* Simplicité
	* SRP : Single Responsibility Principle -> Chaque objet devrait faire une seule chose
	* Pur objet : Pas de statique, pas singletons, pas de services

## Conseils que je retiens
- **Penser à l'utilisateur de l'API**, il faut lui faciliter la vie
	- Nommage qui doit lui parler à lui
	- Paramètres ouverts pour accepter le plus possible d'entrées
	- Sortie très précise pour lui permettre de faire beaucoup de choses
	- Le moins de méthodes possible
- **Nommer les objets pour ce qu'ils sont** (les données qu'ils encapsulent) pas ce qu'ils font
	- Exemple :
		- Mauvais nom : PrimeNumberGenerator
		- Bon nom : PrimeNumbers
- Un objet ne doit pas encapsuler trop de choses (il dit 4 maxi) mais au moins encapsuler quelque chose sinon c'est du procédural.
- Il préfère séparer les méthodes qui font des choses de celles qui renvoient des choses (dérivé du SRP)
	- Il conseille de nommer les méthodes qui renvoient des choses du nom de la valeur qu'ils renvoient person.firstName() au lieu de person.getFirstName() )
	- Et les méthodes qui font des choses avec des verbes
- Eviter les services (qui ne sont que des collections de procédure (ni objet ni fonctionnel)).
- Eviter les noms en "er" (Mapper, Controller) ce sont des indicateurs qu'on repasse au procédural.

# Ce que j'ai moins aimé
* Les justifications de certaines de ses préférences sont parfois simplement basées sur la personnification de l'objet. On trouve parfois des citations comme "ce n'est pas courtois de demander ça à quelqu'un alors ne le demandez pas à un objet". 
* **Sa définition de l'immutabilité**. Pour lui un objet qui contient une liste mutable est immutable si on ne peut pas remplacer l'instance de la liste. Son argumentation sur les intérêts de l'immutabilité est bonne (simplicité pour le debug, thread safety...) mais la définition ne correspond pas pour moi.
* **Sa vision manichéenne** lui est notamment reprochée par Sandro Mancuso. Personnellement je pense que c'est juste une simplification du se son discours. De cette manière c'est plus simple à comprendre que s'il listait tout une suite d'exceptions à la règle. De plus, nous sommes déjà suffisamment prompts au compromis pour ne pas en rajouter.
* **La difficulté de tester le code**. En expérimentant avec sa vision, j'arrive vite à un code difficilement testable. Comme le monsieur n'est pas un grand adepte du TDD, il ne donne que peu de conseils dessus. Comme toutes les classes sont sensées être petites ce devrait être plus facilement testable. Il doit me rester du chemin pour m'adapter,
* Il préconise de n'utiliser que des checked exceptions 0_0'
* Sa **passion des décorateurs**. Il voudrait même les utiliser pour remplacer les streams (aïe) :  

```java
var names = 
  new Sorted( 
    new Unique( 
      new Capitalized( 
        new Replaced( 
          new FileNames( 
            new Directory("/var/users/*.xml")
          ), 
          "([^.]+)\\.xml", 
          "$1" 
        )
      )
    )
  )
```
	    
# En conclusion
Je ne pense pas que j'aimerais travailler sur une de ses bases de code. En particulier à cause des décorateurs, l'exemple de code ci-dessus m'est très difficilement compréhensible. Aussi, les concepts qu'il tire pour créer ses objets sont parfois un peu tirés par les cheveux (dans sa librairie de mail, il introduit des concepts d'enveloppes et de timbres qui, sans explications, sont difficiles à saisir).

Pour l'instant, c'est le seul exemple que j'ai d'un code pur objet. Il m'a fait reconsidérer ma compréhension de ce paradigme. J'y réfléchis à deux fois avant de faire un service maintenant. 

Avec son approche, je vois des intérêts en terme de rangement du code et de compatibilité avec nos langages majoritaires. Cependant, certaines parties de son code ne me donnent vraiment pas envie. Donc je vais continuer à coder avec un mélange de procédural, d'objet et fonctionnel suivant ce qui me semble le plus pratique logique et maintenable. Le livre m'aura au moins permis d'avoir l'esprit clair sur le paradigme que je choisis.

Et pour vous, à quoi ressemble un code pur objet ?