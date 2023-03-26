---
title: TDD c'est pas pour toi
description: 
date: 2023-03-25T09:58:00+01:00
draft: false
preview:
  url: preview-2.jpg
  description: une personne jette le mot TDD dans une poubelle
slug: tdd-c-est-pas-pour-toi
category: catmatique
tags:
- test
- TDD
- catmatique
---

Je suppose que si vous êtes là, c'est parce que vous savez ce que c'est __TDD__, mais au cas où : __Test Driven Development__. C'est une pratique de design logiciel itératif en 3 temps :  
1. Écrire un test automatique (qui ne passe pas, au rouge)
2. Écrire le minimum de code possible pour faire passer le test au vert
3. Refactorer le code pour le rendre meilleur  
  
<br>
Voilà pour l'introduction ultra-minimaliste.

----------------------------------------

J’adore TDD. C’est la pratique qui a le plus transformé ma vie de développeur. Et j’encourage tout le monde à l’apprendre. Je me ferai un plaisir de vous y aider d'ailleurs. 

On me dit parfois que je suis <strong>dog</strong>matique. Peut-être. Donc, je vais essayer ici d’être <strong>cat</strong>matique.

__Quand est-ce que TDD c’est pas pour vous ?__

-----
<div class="row">
{{< picture src="strong.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 1. Vous êtes aussi bon·ne·s sans
TDD m'a appris et apporté plusieurs choses :  
- un meilleur design, testable, pas verrouillé
- des tests lisibles avec de bons rapports d'erreur
- une très bonne couverture fonctionnelle
- un ratio de bug bas
- un niveau de stress réduit (je peux m'arrêter et reprendre n'importe quand)

Je ne vous conseillerais pas TDD si vous avez déjà ces bénéfices sans. Mais est-ce que vous êtes certain·e·s qu'en l'apprenant, vous ne seriez pas meilleur·e·s ?
</div>
</div>

-----

<div class="row">
{{< picture src="trash.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 2, Vous faites du jetable
Si je mène une expérience pour prouver une faisabilité technique ou confirmer un market fit, je ne vais pas faire de TDD. Cette pratique, c'est un investissement, vous échangez un peu de temps en plus à l'écriture pour économiser beaucoup de temps de correction. 
</div>
</div>

-----

<div class="row">
{{< picture src="tools2.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 3. Vous apprenez vos outils 
Je suis très à l’aise en TDD en java. Je sais comment marche ce langage et ses APIs. Je sais à quel niveau me placer pour écrire des tests, comment contourner les problèmes, et les designs qui marchent. 

Quand j’ai commencé Elm, j’étais parfaitement incapable de l’écrire en TDD. Le langage est tellement différent de ce que je connaissais que je n’arrivais même pas à imaginer quel test écrire. Parce que transposer ma manière de tester de java ne fonctionnait pas. 

Pour moi, il faut un minimum de fluidité dans son langage / framework / librairies pour réussir à faire du TDD efficace. 

Mais on pourrait éviter cet écueil ! Il m’aurait suffi d’un tutoriel Elm en TDD pour commencer directement. Et je trouve que c’est quelque chose qui manque dans beaucoup de langages. 
</div>
</div>

-----

<div class="row">
{{< picture src="bored.webp" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 4. Vos tests sont lents
Si votre écosystème fait que des tests rapides sont impossibles, faire du TDD avec de tout petits incréments n'est pas la meilleure idée.

Je ne test drive pas du web avec Cypress ou Playwright. La boucle de feedback n’est pas assez rapide. 

Mais attention, il existe de nombreuses manières de rendre les tests rapides. Souvent l'écosystème n'est pas le problème, c'est votre choix de niveau de test qui l'est.

On peut aussi agrandir la taille des steps TDD ou écrire et faire passer plusieurs tests d’un coup. Dans une de mes expériences, j’étais dans une équipe où chaque changement lançait les tests. Sauf que l’outil (et la suite de test) mettaient en moyenne 1 minute 30 à donner les résultats. C’est largement assez pour perdre son flow. Je m’ennuyais tellement que j’ai commencé à écrire des articles de blog entre 2 runs. 
</div>
</div>

-----

<div class="row">
{{< picture src="geek.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 5. Votre système de type suffit
TDD vient de l'extreme programming. Une des idées fondatrices est le raccourcissement des boucles de feedback. Par exemple : trouver un problème avec un test automatique rapide, c'est mieux qu’avec un test manuel sur la production. De la même manière, c’est plus cool de trouver un problème à la compilation qu’à l’exécution des tests automatiques. 

Si je pouvais passer toute la connaissance portée par mes tests automatiques dans des types, ils deviendraient de facto inutiles. 

J’ai tenté ce qu’on appelle le __Type__ Driven Development. Et j’ai vu que nos systèmes de types ne permettent pas d'assurer toutes les règles métiers que je vérifie dans les tests. La compilation seule ne permet pas de valider que votre système se comporte correctement. 

Je ne l’ai pas encore essayé, mais apparemment, un lange comme Idriss pourrait le faire. Mais est-ce que ça sera plus intéressant que les tests ? Je vous dirais quand je le saurai 🤣.
</div>
</div>


-----

<div class="row">
{{< picture src="book.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 6. Vous codez un problème connu
TDD va vous produire un algorithme qui répond à vos besoins, mais pas forcément le meilleur. 

Vous voulez un algorithme pour savoir si un nombre est premier ? Prenez un des algorithmes qui correspond à vos besoins, traduisez-le dans votre langage, passez votre suite de tests et basta.

Souvent, inclure une librairie est plus simple. Mais pour certains projets où la taille de l'exécutable est importante, avoir uniquement le fragment de fonctionnalité que vous voulez peut être intéressant.
</div>
</div>

-----

<div class="row">
{{< picture src="pipes.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 7. Vous n’avez pas de code métier
C’est là où TDD apporte le plus de valeur. Si tout ce que vous faites, c'est du CRUD avec un framework, TDD va venir comme un cheveu sur la soupe. Réservez votre temps et vos efforts sur votre code plus custom. 

Mais méfiez-vous, au début de ma carrière, je n'aurais pas été capable de dire que mon CRUD est arrivé au moment de déployer du TDD.
</div>
</div>

-----

<div class="row">
{{< picture src="ocicat.jpg" alt="Un meme de chat qui tire la langue. Il est écrit en grand : Here's my opinion of your opinion" width="300">}}
<div>

# 8. Vous allez produire un volume minimal de code
Si vous codez un petit script, un micro micro-service etc. Disons moins de 1000 lignes de code. Je pense que les tests manuels peuvent être suffisamment rapides et le design suffisamment peu important pour se permettre de ne pas en faire. 

Au pire, on réécrit les 1000 lignes. Ça ne prendra pas si longtemps. 

On en revient au code jetable.
</div>
</div>

# Les alternatives
[Victor LAMBRET](https://www.linkedin.com/in/victor-lambret-5218b9b2/) a fait [une conférence sur TDD comparé à ITL](https://www.youtube.com/watch?v=Ddarw3wUXQY) (Iterative Test Last). Les études semblent montrer que l'un ne l'emporte pas sur l'autre. Je ne connais pas encore cette pratique donc je n'ai pas d'avis, mais si TDD c'est pas pour vous, peut-être ITL ? 