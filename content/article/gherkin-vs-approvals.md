
---
title: Gherkin vs Approvals
description: Gherkin est une forme d'écriture de tests qui est très utilisée. Cette technique est vieillissante et il existe des alternatives. Comparons la avec la technique d'approbation de documentation automatique.
date: 2023-02-22T08:36:00+01
draft: true
---
Qu'est-ce que Gherkin ?
=======================
C'est une notation qui encadre l'écriture de tests en langage naturel. Si vous ne connaissez pas son petit nom, elle est reconnaissable par les mots clés "Given, When, Then". C'est la notation d'outils comme cucumber ou specflow.
En pratique voilà à quoi ça pourrait ressembler pour un cas que nous connaissons toustes :
```
Given a coupon of 10$ with a minimum of 50$ of purchase
When the shopping cart is of 50$
Then the amount billed is 40$
```

C'est chouette ! C'est lisible, on peut utiliser des caractères spéciaux, on pourrait même l'écrire en français !  

Sauf que... on peut aussi l'écrire comme ça:
```
Given a shopping cart of 50$
And a coupon for 10$ off after a 50$ purchase or more
When the coupon is applied
Then the bill is for 40$
```

