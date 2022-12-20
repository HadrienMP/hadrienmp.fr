---
title: Le projet où j'ai essayé le présentéisme
description: Comment je suis devenu un super héro en faisant du présentéisme. Je cassais
  tout, mais j'étais adulé. Ou pourquoi l'eXtreme Programming avait raison.
date: 2017-05-31T11:11:53.423Z
preview: 
    url: presenteism.webp
    description: Les 3 protagonistes de la série Workaholics, au bureau, en train de ne pas travailler
draft: false
---
**Spoiler alert** : Le culte du temps de travail c'est mal, la qualité de code c'est bien

De l'acte de présence simple à l'addiction au travail, le présentéisme a de nombreuses formes. En France plus qu'ailleurs, il est bien vu dans de nombreuses entreprises. La plupart d'entre vous a d'ailleurs déjà du entendre la fameuse pique "Tu as pris ton après-midi ?" lancée à quelqu'un qui s'en va à 17h30. LOL !  

Dans une mes précédentes entreprises, on appelait ça "l'implication". Du développeur tout juste entré aux managers du plus haut niveau, c'était une des valeurs les plus importantes. Le nombre d'heures travaillées par jour pouvait faire la différence entre être augmenté ou non. 

C'était comme ça qu'on gérait l'imprésivibilité. Pour livrer à l'heure il fallait rester tard. Mais attention on se  gardait bien de prononcer les mots "heures supplémentaires".  

Après plusieurs missions à ne pas être augmenté, car pas assez "impliqué", je me suis dit qu'après tout : 

 - C'est une des plus grandes entreprises d'informatique de France, s'ils réussissaient leur modèle n'était peut-être pas si mauvais, 
 - Tous les gens que je respecte dans cette société sont dans ce mode de fonctionnement, 
 - Si c'est ce qu'il fallait pour réussir dans mon métier de développeur il fallait au moins essayer.

## Une success story

J'ai profité d'être propulsé lead developer dans une équipe pour me lancer. En théorie, j'étais en horaires fixes, 7h30 de travail par jour. Mes collègues architectes faisaient plus 9h30 - 19h avec une pause courte le midi. J'ai commencé par les immiter. L'effet a été immédiat, mes managers furent contents de moi pour la première fois depuis looooongtemps !

Avec l'arrivée de la première livraison et le rush des deux dernières semaines, je suis rapidement passé à 9h-21h sans vraiment de pause le midi pour tenir les délais. La dernière semaine avant la livraison on était même plus à du 9h-23h. J'étais épuisé. Mais j'avais vraiment l'impression de faire partie de l'équipe. Tout le monde travaillait dur et longtemps. Quand je partais à 23h après avoir livré en recette, je savais que le chef de projet et le directeur de projet allaient recetter de 1h à 4-5h du matin. Et le client était livré en temps et en heure. Après les rushs, j'avais parfois une ou deux journées de repos offertes et on repartait dans un rythme moins violent, mais ça revenait très vite.

Un an après. J'ai eu mes premières augmentations en 2 ans et été mis sur la liste courte pour une promotion. Les managers de toute la division disaient du bien de moi et de ce projet. Victoire !

![Macron Superstar](https://i.imgflip.com/1orb1h.jpg). 

## Le revers de la médaille.

J'ai fait plus de 400 heures supplémentaires non rémunérées, ce qui fait environ 50 jours de travail ou 2 mois et demi. Il va sans dire que je n'avais plus de vie personnelle, le week-end était pour dormir ! 

Les délais nous ont poussé à ne pas faire de revues de code, de binômage, de tests automatiques. Nous n'avons pas détecté l'apparition de failles graves de sécurité. Le code est devenu incompréhensible et inmaintenable, même par l'équipe. En conséquence, il est arrivé que le temps de correction des régressions soit 3 fois supérieur au temps de développement. 

Le client se plaignait du coût des évolutions et a fini par geler le projet. Pas le meilleur investissement pour mon employeur.

Enfin, je n'ai pas beaucoup progressé dans le développement et je ne peux pas dire que je sois fier de ce projet. 

## Travailler moins pour gagner plus

Mais j'ai appris quelques choses et pris des décisions pour mes futurs projets. La pierre angulaire ? Faut travailler moins.

![Laziness is a synonym of efficiency](http://www.awesomeinventions.com/wp-content/uploads/2016/02/Efficiency.jpg)

### 1. Au bout d'une certaine durée de travail, on arrête d'être productif. 

Je l'ai vu lors de mes plus longues journées, je n'arrivais plus à me concentrer et j'avais du mal à trouver les solutions aux problèmes. Pire, parfois mon travail dans ces moments créait des régressions que je devais corriger le lendemain. Des études américaines concluent même qu'après 8h de travail, nous devenons contre productifs. 

De plus, nous avons tous un rythme de croisière au travail. Se pousser au delà de ce rythme fait baisser notre endurance. Les projets sont des marathons de plusieurs mois à plusieurs années, pas des sprints. Pousser son rythme et réduire son endurance c'est se précipiter vers le burn out.

### 2. Plus de pauses, plus de créativité

Le développement est un travail créatif. Nos capacités à résoudre nos problèmes de développement dépendent de notre habilité à associer nos problèmes à des solutions "classiques" (des patterns). Dans le pire des cas nous devons trouver une nouvelle solution. 

La créativité a besoin de temps. La situation a déjà du vous arriver, vous êtes coincés en fin de journée sur un sujet et en arrivant le matin, la solution vous apparaît évidente. Prendre du recul, penser à autre chose et du temps, ce sont des éléments essentiels au code de qualité.

### 3. Pas de qualité, pas d'évolutions

L'arrêt des lots d'évolution sur ce projet et mes expériences sur d'autres projets difficiles à maintenir m'ont montré que sans qualité de code, pas d'évolution. La mauvaise qualité du code (et souvent de documentation) augmente le temps nécessaire pour le faire évoluer sans bugs de manière exponentielle.

### 4. On peut satisfaire tout le monde avec plus de qualité

En simplifiant grossièrement, pour réussir un projet, il faut satisfaire le client, le management et les développeurs : 

 - Le client veut des fonctionnalités, le plus vite possible pour longtemps, un logiciel pérenne. Il pousse donc en général pour réduire les délais et payer moins cher. 
 - Le management veut faire le plus de marge possible. Pour ce faire il veut faire plaisir au client pour continuer à vendre tout en minimisant les coûts. 
 - Le développeur veut en général produire du code de qualité, dont il peut être fier, moins souffrir de la dette technique et conserver l'équilibre avec sa vie personnelle. 

Se focaliser sur la qualité de code permettrait de satisfaire tout le monde. Un code de qualité, maintenable et bien documenté permet d'ajouter des fonctionnalités à un rythme bien plus élevé dans le temps. Dans mon cas, le logiciel a vécu pendant un an et demi avant de geler. Comme certains requins, un logiciel qui reste statique est condamné. Si nous avions pu ajouter des fonctionnalités sans ce risque élevé de régressions et des coûts prohibitifs, peut-être que ce projet aurait pu vivre plus longtemps. Dans ce cas, le client aurait eu son logiciel pérenne, le management aurait eu des bénéfices sur le long terme (sans compter l'effet bénéfique sur la réputation de l'entreprise) et les développeurs auraient été plus heureux.

--------------------------------------------------

Ces conclusions paraissent évidentes à de nombreux développeurs. Pourtant même les convaincus ne les appliquent généralement pas. 

Parfois je doute encore aussi. Je suis souvent tenté de faire plaisir au client en livrant vite. Je sacrifie la qualité ou mon temps personnel. A chaque fois que je l'ai fait, ça m'a créé des problèmes (régressions, élévation du cout de maintenance etc.). D'autres fois je pars dans l'autre direction et je deviens un nazi de la qualité de code et je tourne en rond. Un jour je trouverais l'équilibre (binômage to the rescue). 

![Equilibre, Sapologie](/images/sapologie.jpeg)

Pour conclure je vais paraphraser *Clean Coder* : 

- Il ne faut pas négocier sur la qualité ou les tests, 
- il faut négocier les fonctionnalités à coder dans le temps imparti ;
- Les heures supplémentaires sont à considérer :
	- en dernier recours, 
	- à un volume raisonnable (une heure ou deux par jour maximum)
	- pendant une durée prédéterminée (une ou deux semaines maximum)
	- avec une autre solution en cas d'échec

Et vous, comment vous gérez la pression sur les délais de livraison ?