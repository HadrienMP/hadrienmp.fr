---
title: TDD c'est pas pour toi
description: 
date: 2023-03-01T09:58:00+01:00
draft: true
preview:
  url: preview.png
  description: 
slug: tdd-pas-pour-toi
category: catmatique
tags:
- test
- TDD
- catmatique
---

__TL;DR :__

----------------------------------------

J’adore TDD. C’est la pratique qui a le plus transformé ma vie de développeur. Et j’encourage tout le monde à l’apprendre. Je me ferais un plaisir de vous y aider. 

On me dit parfois que je suis dogmatique. Peut-être. Donc je vais essayer ici d’être catmatique. Quand est-ce que TDD c’est pas pour vous ?

# 1. Vous ne maîtrisez pas vos outils 
Je suis très à l’aise en TDD en java. Je sais comment marche ce langage et ses APIs. Je sais à quel niveau me placer pour écrire des tests, comment contourner les problèmes, et les designs qui marchent. 

Quand j’ai commencé Elm, j’étais parfaitement incapable de l’écrire en TDD. Le langage est tellement différent de ce que je connaissais que je n’arrivais même pas à imaginer quel test écrire. Parce que transposer ma manière de tester de java ne fonctionnait pas. 

Pour moi, il faut un minimum de fluidité dans son langage / framework / librairies pour réussir à faire du TDD efficace. 

Mais on pourrait éviter cet écueil ! Il m’aurait suffit d’un tutoriel Elm en TDD pour commencer directement. Et je trouve que c’est quelque chose qui manque dans beaucoup de langages. 

# 2, Vous faites du jetable
Si je mène une expérience pour prouver une faisabilité technique ou confirmer un market fit, je ne vais pas faire de TDD. 

# 3. Tester automatiquement est lent
Ici c’est discutable, on peut agrandir la taille des steps TDD ou écrire et faire passer plusieurs tests d’un coup. Dans une mes expériences, j’étais dans une équipe où chaque changement lançait les tests. Sauf que l’outil (et la suite de test) mettaient en moyenne 1 minute 30 à donner les résultats. C’est largement assez pour perdre son flot. Je m’ennuyais tellement que j’ai commencé à écrire des articles de blog entre 2 runs. 

Si votre écosystème fait que vos tests sont lents, TDD c’est pas la meilleure idée. 

C’est aussi pourquoi je ne test drive pas du web avec Cypress ou Playwright. La boucle de feedback n’est pas assez rapide. 

# 4. Vous êtes aussi bon.ne.s sans
Sachant que vous ne pourrez pas le dire sans avoir appris et mesuré.

On peut atteindre des niveaux de qualité satisfaisants sans TDD. La conférence de X sur les études sur ce sujet semble le montrer. 

TDD m’apporte beaucoup de valeur et de joie au quotidien. Mais si ce n’est pas le cas pour vous, aucune raison de le faire ! Attention cela dit à ne pas négliger la documentation vivante (dont les tests automatisés font partie). 

# 5. Votre système de type suffit. 

TDD vient d’extreme programming. Une des idées fondatrices est le raccourcissement des boucles de feedback. Par exemple, c’est mieux de trouver un problème avec un test automatique rapide qu’avec une test manuel sur la production. De la même manière, c’est plus cool de trouver un problème à la compilation qu’à l’exécution des test automatiques. 

Si je pouvais passer toute la connaissance portée par mes tests automatiques dans des types, ils deviendraient de facto inutiles. 

J’ai tenté ce qu’on appelle le Type Driven Development. Et j’ai vu que nos systèmes de types ne permettent pas de porter toute les contraintes des tests. La compilation seule ne permet pas de valider que votre système se comporte correctement. 

Je ne l’ai pas encore essayé mais apparemment, un lange comme Idriss pourrait le faire. Mais est-ce que ça sera plus intéressant que les tests ? Je vous dirais quand je le saurais 🤣.

# 6. Vous codez une problème connu
Dans les exemples classiques, on ne test drive pas, hors dojo ou fan de la pratique, un algorithme connu. Par exemple un algorithme de détection de nombre premier, c’est un problème résolu déjà, on prend l’algorithme démontré, on le traduit en code et on valide rapidement avec quelques exemples. 

Souvent il est préférable dans ces cas d’inclure une librairie. Mais parfois le copier coller a du bon, pour limiter la taille d’une app frontend par exemple. 

# 7. Vous n’avez pas de code métier
C’est là ou TDD apporte le plus de valeur. Si tout ce que vous faites c’est du CRUD avec un framework, TDD va venir comme un cheveu sur la soupe. Réservez votre temps et vos efforts sur votre code plus custom. 

# 8. Vous allez produire un volume minimal de code
Si vous codez un petit script, un micro micro-service etc. Disons, moins de 1000 lignes de code. Je pense que les tests manuels peuvent être suffisamment rapides et le design suffisamment peu important pour se permettre de ne pas en faire. 

Au pire, on réécrit les 1000 lignes. Ça ne prendra pas si longtemps. 

On en revient au code jetable

# 9. VS test first et test last

