---
title: Gherkin vs. Approvals
description: Gherkin est une forme d'écriture de tests qui est très utilisée. Cette technique est vieillissante et il existe des alternatives. Comparons la avec la technique d'approbation de documentation automatique.
date: 2023-02-22T08:36:00+01:00
draft: false
preview:
  url: preview.png
  description: Gherkin vs. Approvals écris dans un style de combat de super héros
slug: gherkin-vs-approvals
category: test
tags:
- test
- gherkin
- approvals
- behaviour driven development
---

__TL;DR :__
Traduire le langage naturel de vos expert.e.s métier en code, c'est très compliqué. Il y a mille manières de dire la même chose en langage naturel. Une seule dans votre code.

Pourtant de la documentation lisible et toujours à jour, ça a beaucoup de valeur.

Alors prenons le problème à l'envers, générons notre documentation dans les tests. À la place de l'assertion, on compare, avec un diff, l'ancienne documentation et la nouvelle. Les différences sont des régressions.

C'est beaucoup plus simple car on peut représenter d'une seule manière états et transitions.

----------------------------------------

Pour simplifier la suite, je m'attaque à la pratique d'écrire ses tests en Gherkin, pas à la notation Gherkin qui est très bien.

Gherkin
=======
C'est quoi ?
------------
C'est une __notation__ qui encadre l'écriture de __tests en langage naturel__. Si vous ne connaissez pas son petit nom, elle est reconnaissable par les mots clés "Given, When, Then". C'est la notation d'outils comme cucumber, specflow, fitnesse etc. Ça peut ressembler à ça :
```Gherkin
Given I am logged in as an admin
When I go to a blog post
Then I can delete a comment
```

Pourquoi faire ?
----------------

Faire écrire nos tests par les expert.e.s métier par exemple. C'est du langage naturel donc pas de soucis. En vrai, on voit rarement des équipes où ça arrive. 

Mais même s'ils sont rédigés par les devs, la modélisation en code atteint vite ses limites. C'est pourquoi j'aime beaucoup utiliser le tableau blanc pour expliquer des concepts, des fonctionnalités, des architectures. Un test en Gherkin bien écrit peut être bien plus lisible que du code.

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

C'est plus lisible. Même si on aurait pu faire mieux en lisibilité pour le code en Elm.


De la colle et des menteurs
---------------------------
Il faut maintenant pouvoir produire un test depuis la notation Gherkin. 

Pour chaque fragment de gherkin il va vous falloir définir un parseur pour en extraire les valeurs intéressantes. Une fois que vous avez vos valeurs, vous écrivez votre scénario de test comme d'habitude dans votre langage de programmation. En gros il vous faut tout une __couche de glue__ entre le domaine du langage naturel et le domaine du code.

En tant que devs on a l'habitude des couches de glue. C'est pas grave, tant qu'elles ne sont pas trop grosses.

### Collons un coupon de réduction avec cucumber.js

Le scénario (qui sera sauvé dans un fichier séparé) 

```gherkin
Given a coupon of 10$ with a minimum of 50$ of purchase
When the shopping cart is of 50$
Then the amount billed is 40$
```

Le fichier "steps" de cucumber.js

```js
const defineSupportCode = require('cucumber').defineSupportCode;

defineSupportCode(({ Given, Then, When }) => {
  let coupon = null;
  let actualBilledAmount = null;
  
  // C'est ce que j'appelle un parseur
  Given('a coupon of {amount}$ with a minimum of {minimumPurchase}$ of purchase', 
        (amount, minimumPurchase) => {
          coupon = {amount, minimumPurchase};
        });
  When('the shopping cart is of {amount}$', 
      (amount) => { 
        actualBilledAmount = applyCoupon({coupon, cartTotal: amount});
      });
  Then('the amount billed is {amount}$',
      (amount) => { 
        expect(actualBilledAmount).toEqual(amount);
      });
})

```

Avec de la magie, cucumber va répertorier tous vos parseurs et vos fichier de scénario. Il va trouver le parseur qui correspond à votre scénario et vous sortir un rapport de tests.

### Instant police

Moment useless fact. Une des __techniques de police pour reconnaitre un menteur__ c'est de poser la même question plusieurs fois. La personne qui ment récitera son mensonge. Elle utilise les mêmes mots, les mêmes expressions etc. À l'inverse, la personne sincère modifie naturellement son discours à chaque fois. Elle traduit en fait à la volée un modèle mental, des souvenirs.

Donc, __si vous questionnez votre expert.e métier, vous aurez des règles exprimées différemment à chaque fois__. Si vous avez plusieurs expert.e.s, c'est encore mieux ! Chacune aura sa manière de s'exprimer !

### 50 nuances de coupons de réduction
Dans l'exemple précédent, on avait un exemple de scénario de coupon de réduction :
```gherkin
Given a coupon of 10$ with a minimum of 50$ of purchase
When the shopping cart is of 50$
Then the amount billed is 40$
```
On pourrait aussi l'écrire comme ça
```gherkin
Given a shopping cart of 50$
And a coupon for 10$ off after a 50$ purchase or more
When the coupon is applied
Then the bill is for 40$
```

Voire encore :
```gherkin
Given I purchased 50$ of groceries
When I present my coupon for 10$ off for a 50$ purchase or more
Then I will pay 40$
```

Et je ne m'arrête que par soucis de longueur de cet article 😇.

Aïe !
---
Ça commence à sentir mauvais non ? Si notre ensemble d'entrée en Gherkin est gigantesque, notre ensemble de sortie en code est petit. On va avoir __beaucoup de glue__. Le fichier de parseur d'une fonctionnalité va grossir pas mal. Et quand vous ajoutez à ça la nécessité de réutiliser les steps entre des fonctionnalités différentes, ça devient un sacré fouilli.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 641 416.484375" width="641" height="416.484375" style="max-width: 600px">
  <!-- svg-source:excalidraw -->
  <defs>
    <style class="style-fonts">
      @font-face {
        font-family: "Virgil";
        src: url("https://excalidraw.com/Virgil.woff2");
      }
      @font-face {
        font-family: "Cascadia";
        src: url("https://excalidraw.com/Cascadia.woff2");
      }
    </style>
  </defs>
  <g stroke-linecap="round" transform="translate(503 148) rotate(0 64 62.5)"><path d="M79.07 1.02 C88.42 2.28, 99.16 8.97, 106.44 15.4 C113.73 21.84, 119.15 30.41, 122.8 39.62 C126.45 48.83, 129.27 61.03, 128.33 70.67 C127.39 80.32, 122.84 89.8, 117.14 97.49 C111.44 105.18, 102.8 112.24, 94.15 116.82 C85.49 121.4, 75.13 124.91, 65.21 124.98 C55.3 125.05, 43.46 121.66, 34.64 117.25 C25.81 112.85, 17.93 106.54, 12.26 98.57 C6.59 90.6, 1.93 78.99, 0.62 69.43 C-0.69 59.88, 1.08 50.3, 4.41 41.24 C7.74 32.17, 13.12 21.52, 20.61 15.07 C28.09 8.61, 38.1 4.14, 49.31 2.49 C60.51 0.85, 80.2 4.08, 87.84 5.18 C95.48 6.27, 95.65 8.17, 95.15 9.06 M92.85 5.82 C101.75 8.89, 109.06 16.4, 114.88 23.92 C120.7 31.45, 125.95 41.12, 127.8 50.99 C129.64 60.87, 129.31 73.53, 125.96 83.17 C122.61 92.8, 115.09 102.15, 107.7 108.8 C100.3 115.45, 91.02 120.48, 81.61 123.06 C72.2 125.64, 60.99 126.49, 51.23 124.29 C41.47 122.09, 30.69 116.2, 23.06 109.84 C15.43 103.48, 9.02 94.93, 5.45 86.13 C1.87 77.33, 1 66.45, 1.61 57.04 C2.22 47.63, 4.04 37.88, 9.13 29.67 C14.22 21.47, 23.44 12.68, 32.15 7.83 C40.86 2.97, 51.62 0.67, 61.38 0.55 C71.14 0.43, 85.62 6.23, 90.71 7.09 C95.8 7.95, 92.43 4.86, 91.93 5.69" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(543.2451660040609 197.30582617584076) rotate(0 24 13.000000000000028)"><text x="24" y="18" font-family="Virgil, Segoe UI Emoji" font-size="20px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr">Code</text></g><g stroke-linecap="round" transform="translate(10 10) rotate(0 203 198.2421875)"><path d="M273.4 13.07 C290.58 16.01, 306.91 27.93, 321.82 38.26 C336.74 48.6, 351.51 61.08, 362.9 75.07 C374.29 89.06, 383.32 105.82, 390.14 122.19 C396.97 138.57, 401.61 155.68, 403.86 173.33 C406.11 190.99, 406.16 210.5, 403.64 228.13 C401.11 245.75, 396.27 263.01, 388.72 279.11 C381.17 295.2, 370.14 310.85, 358.32 324.71 C346.51 338.56, 332.73 351.88, 317.86 362.23 C302.98 372.57, 286.36 381.12, 269.08 386.76 C251.8 392.41, 232.38 395.31, 214.17 396.11 C195.96 396.91, 177.65 395.47, 159.81 391.56 C141.97 387.66, 123.47 380.96, 107.14 372.69 C90.81 364.42, 75 354.17, 61.81 341.95 C48.62 329.72, 37.23 314.85, 28.01 299.32 C18.79 283.8, 11.03 266.22, 6.49 248.81 C1.95 231.4, 0.3 212.53, 0.74 194.86 C1.19 177.2, 4.07 159.75, 9.17 142.83 C14.26 125.9, 21.8 108.69, 31.33 93.32 C40.87 77.96, 53.03 62.67, 66.37 50.64 C79.72 38.61, 95.12 28.96, 111.39 21.16 C127.66 13.35, 146.09 7.23, 163.99 3.79 C181.89 0.35, 198.19 -1.92, 218.81 0.53 C239.42 2.98, 274.4 14.06, 287.7 18.48 C300.99 22.9, 300.17 24.01, 298.57 27.07 M176.44 1.13 C193.58 -4.29, 215.61 -1.03, 233.69 1.91 C251.78 4.84, 268.57 11.5, 284.94 18.75 C301.31 26, 317.55 34.43, 331.91 45.4 C346.28 56.38, 360.59 69.88, 371.14 84.6 C381.69 99.33, 389.4 116.93, 395.24 133.76 C401.07 150.59, 405.14 167.74, 406.15 185.6 C407.16 203.47, 405.54 223.31, 401.3 240.94 C397.07 258.57, 389.11 275.69, 380.73 291.4 C372.35 307.11, 363.59 322.29, 351.02 335.21 C338.45 348.13, 320.97 359.6, 305.31 368.93 C289.66 378.27, 274.31 386.46, 257.09 391.19 C239.87 395.92, 220.58 397.69, 202.01 397.31 C183.43 396.92, 163.44 394.22, 145.64 388.89 C127.84 383.56, 110.42 374.6, 95.19 365.34 C79.96 356.07, 66.7 346.02, 54.26 333.28 C41.81 320.54, 28.8 305.08, 20.54 288.91 C12.28 272.74, 7.93 254.18, 4.69 236.27 C1.45 218.36, -0.27 199.19, 1.11 181.46 C2.49 163.72, 6.8 146.21, 12.96 129.84 C19.12 113.47, 27.55 97.69, 38.09 83.22 C48.63 68.75, 61.88 54.14, 76.19 43 C90.51 31.86, 107.28 23.28, 123.97 16.4 C140.67 9.52, 167.18 3.28, 176.35 1.71 C185.53 0.14, 178.45 3.5, 179.04 6.97" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(94.45732341913083 164.56379240149494) rotate(0 118.5 43.50000000000003)"><text x="118.5" y="61" font-family="Virgil, Segoe UI Emoji" font-size="68.39506172839508px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr">Gherkin</text></g><g stroke-linecap="round"><g transform="translate(426 217) rotate(0 36.69564150198369 -0.2409628860652333)"><path d="M0.99 0.57 C12.86 0.36, 59.13 -0.67, 71.1 -1.06 M0.05 -0.17 C12.31 -0.21, 61.26 0.56, 73.35 0.45" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(426 217) rotate(0 36.69564150198369 -0.2409628860652333)"><path d="M46.06 9.08 C53.12 8.85, 60.13 5.59, 72.7 1.52 M45.91 11.4 C53.27 7.82, 62.56 4.43, 73.98 0.77" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(426 217) rotate(0 36.69564150198369 -0.2409628860652333)"><path d="M46.16 -11.44 C53.23 -5.76, 60.21 -3.12, 72.7 1.52 M46.02 -9.12 C53.28 -6.27, 62.53 -3.23, 73.98 0.77" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask></svg>

Mais alors, que faire ?

## Réduire l'ensemble d'entrée ?
Une des manières de le faire est de __n'autoriser qu'une seule formulation "naturelle" par fragment de code__.

En gros, on crée un set de vocabulaire restreint qu'on va parser pour le transformer en un test exécutable. Tient c'est marrant, ça ressemble beaucoup à la définition d'un langage de programmation ! Oui. __On vient juste de créer un nouveau langage de programmation__ pour notre domaine. On appelle souvent ça un "Domain Specific Language". Pas de problème avec les DSL en soit, c'est même plutôt cool. Mais, de facto, __les personnes qui l'écrivent sont des devs__, même si leur rôle est Product Owner.

Même avec cette solution il va vous falloir un certain outillage pour que ça fonctionne :
- De l'analyse statique pour s'assurer que la règle "1 formulation / 1 fragment de code" soit respectée
- De l'autocomplétion pour ne pas se tromper sur la forme
- Un dictionnaire des formules

Ça fait pas mal de boulot. Rendus là, __je préfère clairement écrire du code directement__ et faire un effort de lisibilité pour pouvoir écrire les tests en binômes avec l'expert.e métier.


Approvals
=========
## C'est quoi ?

Écrivez vos cas de tests comme d'habitude, mais __plutôt que de construire une assertion, construisez une documentation__ lisible de ce cas. Documentez le setup, l'action et la sortie. Vous pouvez l'écrire dans un fichier Markdown, __AsciiDoc__, Graph même Gherkin si vous voulez ! 

Une fois la documentation générée on la vérifie à la main et on l'approuve (en renommant le fichier en .approved par exemple). Chaque fois qu'on relancera les tests, ils __compareront la documentation générée avec celle approuvée__. Chaque différence est une régression.

La librairie [approvals](https://approvaltests.com/) pourra vous aider à gérer simplement vos fichiers, assertions et approbations.

Reprenons l'exemple du coupon de réduction !
```js
describe('Minimum purchase coupon', () => {
  it('is substracted from the cart amount', () => {
    // Given
    const coupon = { minimumPurchase: 50, amount: 10 };
    const cartTotal = 50;

    // When
    const billedAmount = applyCoupon({ coupon, cartTotal });

    // Then
		// verify produit une assertion, donc vous lancez ce test avec votre test runner habituel.
    approvals.verify(`
    Given a coupon of ${coupon.amount}$ with a minimum of ${coupon.minimumPurchase}$ of purchase
    When the shopping cart is of ${cartTotal}$
    Then the amount billed is ${billedAmount}$ 
    `);
    // Ici je produit de la notation gherkin, on commence à bien la connaitre, autant l'exploiter !
  });
});

// approvals va créer un fichier dans le même dossier que le test
// minimum_purchase_coupon.is_substracted_from_the_cart_amount.approved.txt
// et sa version .received.txt
```

## Pourquoi c'est mieux ?

__La complexité est bien moindre__ car l'ensemble d'entrée est réduit. Vos états et transitions sont exprimées d'une seule manière dans le code. Ils peuvent potentiellement être représentés d'une seule manière dans la documentation.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 147" width="393" height="147" style="max-width: 400px">
  <!-- svg-source:excalidraw -->

  <defs>
    <style class="style-fonts">
      @font-face {
        font-family: "Virgil";
        src: url("https://excalidraw.com/Virgil.woff2");
      }
      @font-face {
        font-family: "Cascadia";
        src: url("https://excalidraw.com/Cascadia.woff2");
      }
    </style>
  </defs>
  <g stroke-linecap="round" transform="translate(10 10) rotate(0 64 62.5)"><path d="M86.03 4.58 C94.97 6.95, 104.28 14.04, 111.06 21.09 C117.83 28.15, 124.19 37.51, 126.69 46.89 C129.19 56.28, 128.6 68.07, 126.08 77.41 C123.57 86.76, 118.09 95.7, 111.59 102.96 C105.08 110.21, 96.08 117.43, 87.05 120.93 C78.02 124.43, 67.3 125.2, 57.41 123.95 C47.51 122.69, 35.97 118.67, 27.68 113.41 C19.38 108.15, 12.14 100.66, 7.66 92.38 C3.18 84.11, 0.84 73.53, 0.77 63.76 C0.71 53.99, 2.71 42.54, 7.27 33.76 C11.83 24.99, 20.05 16.71, 28.15 11.12 C36.25 5.53, 45.04 0.77, 55.88 0.23 C66.71 -0.31, 85.83 5.79, 93.16 7.88 C100.5 9.97, 100.33 12.02, 99.88 12.78 M87.79 4.5 C97.2 6.65, 106.38 13.84, 112.57 20.83 C118.75 27.82, 122.57 37.12, 124.88 46.44 C127.18 55.75, 128.53 67.36, 126.42 76.72 C124.3 86.09, 118.84 95.14, 112.18 102.64 C105.53 110.13, 95.64 117.99, 86.48 121.7 C77.32 125.41, 67.2 126.34, 57.23 124.89 C47.26 123.43, 34.74 118.59, 26.66 112.97 C18.58 107.35, 13.4 99.48, 8.76 91.17 C4.11 82.85, -0.8 72.79, -1.22 63.09 C-1.64 53.4, 1.28 41.73, 6.24 33.02 C11.2 24.31, 20.35 16, 28.53 10.82 C36.72 5.64, 45.81 3.13, 55.35 1.93 C64.9 0.74, 80.49 3.27, 85.81 3.64 C91.13 4.01, 87.48 3.14, 87.29 4.16" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(50.245166004060934 59.305826175840764) rotate(0 24 13)"><text x="24" y="18" font-family="Virgil, Segoe UI Emoji" font-size="20px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr">Code</text></g><g stroke-linecap="round" transform="translate(255 12) rotate(0 64 62.5)"><path d="M88.75 5.07 C97.51 7.73, 106.26 14.95, 112.43 22.55 C118.6 30.14, 123.63 40.98, 125.77 50.63 C127.91 60.27, 127.91 71.18, 125.29 80.41 C122.66 89.64, 116.88 99.01, 110.03 106.01 C103.18 113.02, 93.36 119.56, 84.18 122.44 C75.01 125.31, 64.67 125.04, 54.97 123.27 C45.27 121.49, 34.11 117.42, 25.99 111.79 C17.87 106.15, 10.68 98.16, 6.28 89.46 C1.87 80.77, -0.72 69.44, -0.46 59.63 C-0.21 49.82, 2.76 38.79, 7.79 30.59 C12.83 22.38, 21.4 15.55, 29.77 10.39 C38.13 5.22, 46.98 0, 57.97 -0.38 C68.97 -0.76, 88.39 5.68, 95.73 8.11 C103.06 10.53, 102.44 13.28, 101.97 14.18 M92.57 6.36 C101.1 10.05, 110.57 20.23, 116.57 28.44 C122.57 36.65, 127.4 46.07, 128.57 55.63 C129.73 65.2, 127.09 76.78, 123.55 85.83 C120.01 94.88, 114.79 103.66, 107.33 109.92 C99.87 116.18, 88.77 121.27, 78.8 123.4 C68.83 125.53, 57.2 124.94, 47.51 122.69 C37.83 120.45, 27.76 116.22, 20.69 109.92 C13.63 103.62, 8.55 94.13, 5.13 84.89 C1.72 75.65, -1.01 64.24, 0.22 54.46 C1.44 44.67, 6.7 33.95, 12.48 26.2 C18.25 18.44, 26.48 12.09, 34.89 7.93 C43.29 3.77, 53.19 1.31, 62.89 1.24 C72.59 1.17, 88.11 6.09, 93.09 7.52 C98.07 8.94, 93 8.77, 92.76 9.8" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(299.74516600406093 61.305826175840764) rotate(0 19.5 13)"><text x="19.5" y="18" font-family="Virgil, Segoe UI Emoji" font-size="20px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr">Doc</text></g><g stroke-linecap="round"><g transform="translate(146 73) rotate(0 51.00721469170878 0.6520414400193886)"><path d="M0.57 0.37 C17.75 0.47, 85.51 0.42, 102.61 0.16 M-0.6 -0.48 C16.52 -0.13, 84.71 1.78, 101.98 1.79" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(146 73) rotate(0 51.00721469170878 0.6520414400193886)"><path d="M74.25 12.61 C81.31 10.9, 86.5 4.89, 103.56 0.51 M72.65 10.97 C80.7 10.03, 85.91 7.45, 102.76 1.84" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(146 73) rotate(0 51.00721469170878 0.6520414400193886)"><path d="M74.58 -7.91 C81.49 -4.27, 86.58 -4.96, 103.56 0.51 M72.98 -9.55 C81.11 -5.7, 86.24 -3.48, 102.76 1.84" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask></svg>

De plus, comme on s'affranchi de la contrainte du parsing, on peut être __plus créatifs sur la forme de cette documentation__. On peut construire des graphs, des SVGs animés etc.

On pourrait imaginer de l'ascii art pour notre exemple de coupon !

```markdown
+----------------------+       o--\           |                 
|       10$ off        |           \    50$   |     =>  40$ to pay
| for a minimum of 50$ |            \_________|  
+----------------------+             O       O   
```

Et on peut toujours __prendre notre expert.e métier et écrire les tests à plusieurs__. Grâce au support de la documentation, tout le monde pourra comprendre.

### Anecdote

Avec [Thomas CARPAYE](https://twitter.com/Tarcaye) (oui encore), on utilisé cette technique pour refactorer du code legacy. 

On avait trouvé un fragment de code à refactor qui était incompréhensible. On a trouvé les entrées à faire varier. On a fait une combinatoire des valeurs intéressantes pour nous servir d'entrée de tests et sorti un gros fichier markdown avec le setup et le résultat. À chaque opération de refactor, on relancait notre test et on voyait si on avait cassé quelque chose ou non. 

Le gros avantage ? Quand on trouvait que ce qu'on avait en sortie semblait aussi, voire plus, logique qu'auparavant on amenait notre doc à notre expert métier. Il pouvait très facilement nous dire qui a raison, avant ou après. Très puissant.


Conclusion
==========

J'adore la documentation visuelle. Je retrouve plus de ce qui me plaisait dans le Behaviour Driven Development avec la génération de documentation qu'avec la génération de tests à partir de Gherkin.

Comme d'habitude, je sais que mon opinion est controversée. La communauté aime beaucoup les outils Gherkin (style cucumber) et tant mieux si ça fonctionne dans vos équipes. Mais __que diriez-vous de tenter la génération de doc__ pour voir ce que ça donne ?


## Pour aller plus loin
Pour aller plus loin sur le sujet, cette technique d'approvals est bien expliquée par [Stéphane FAUVEL](https://twitter.com/sebfauvel) à [bdx.io](https://www.youtube.com/watch?v=AQDILnknTJ0&themeRefresh=1). 

Elle est inspirée de la philosophie [living documentation](https://www.informit.com/store/living-documentation-continuous-knowledge-sharing-by-9780134689326) de [Cyrille MARTRAIRE](https://twitter.com/cyriux), n'hésitez pas à aller jeter un oeil à son livre sur le sujet. De la doc qui est toujours à jour par design, qui pourrait dire non ?
