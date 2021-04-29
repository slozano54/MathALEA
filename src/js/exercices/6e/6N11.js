import Exercice from '../ClasseExercice.js'
import { liste_de_question_to_contenu, randint, combinaison_listes, calcul, lettre_depuis_chiffre, html_consigne } from '../../modules/outils.js'
import { SVG_reperage_sur_un_axe, Latex_reperage_sur_un_axe } from '../../modules/macroSvgJs.js'

export const titre = 'Lire l’abscisse entière d’un point (grands nombres)'

/**
 * Lire l'abscisse entière d'un point
 * @Auteur Jean-Claude Lhote et Rémi Angot
 * référence 6N11
 */
export default function Lire_abscisse_entiere () {
  'use strict'
  Exercice.call(this) // Héritage de la classe Exercice()
  this.titre = titre
  this.consigne = "Lire l'abscisse de chacun des points suivants."
  this.nb_questions = 3
  this.nb_questions_modifiable = true
  this.nb_cols = 1
  this.nb_cols_corr = 1
  this.spacing = 1
  this.spacing_corr = 1
  this.sup = 4
  this.liste_packages = ['tkz-euclide']

  this.nouvelle_version = function (numero_de_l_exercice) {
    // numero_de_l_exercice est 0 pour l'exercice 1
    let type_de_questions
    this.liste_questions = []
    this.liste_corrections = []
    this.contenu = '' // Liste de questions
    this.contenu_correction = '' // Liste de questions corrigées
    if (this.sup == 4) { type_de_questions = combinaison_listes([1, 2, 3], this.nb_questions) } else {
      type_de_questions = combinaison_listes(
        [parseInt(this.sup)],
        this.nb_questions
      )
    }

    this.contenu = html_consigne(this.consigne)
    for (let i = 0,
      abs0,
      l1,
      l2,
      l3,
      x1,
      x2,
      x3,
      x11,
      x22,
      x33,
      pas1,
      pas2,
      id_unique,
      texte,
      texte_corr; i < this.nb_questions; i++) {
      l1 = lettre_depuis_chiffre(i * 3 + 1)
      l2 = lettre_depuis_chiffre(i * 3 + 2)
      l3 = lettre_depuis_chiffre(i * 3 + 3)
      switch (type_de_questions[i]) {
        case 1: // Placer des entiers sur un axe (milliers)
          abs0 = randint(1, 9) * 1000
          pas1 = 0.001
          pas2 = 10
          break

        case 2: // Placer des entiers sur un axe (dizaines de mille)
          abs0 = randint(5, 15) * 10000
          pas1 = 0.0001
          pas2 = 10
          break

        case 3: // Placer des entiers sur un axe (centaines de mille)
          abs0 = randint(35, 85) * 100000
          pas1 = 0.00001
          pas2 = 10
          break
      }
      x1 = randint(0, 2)
      x2 = randint(3, 4)
      x3 = randint(5, 6)
      x11 = randint(1, 9)
      x22 = randint(1, 9)
      x33 = randint(1, 3)
      if (sortie_html) {
        id_unique = `${i}_${Date.now()}`
        this.contenu += `<div id="div_svg${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
        SVG_reperage_sur_un_axe(
          `div_svg${numero_de_l_exercice}${id_unique}`,
          abs0,
          6,
          pas1,
          pas2,
          [
            [l1, x1, x11],
            [l2, x2, x22],
            [l3, x3, x33]
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0]
          ],
          false
        )
        this.contenu_correction += `<div id="div_svg_corr${numero_de_l_exercice}${id_unique}" style="width: 90%; height: 200px;  "></div>`
        SVG_reperage_sur_un_axe(
          `div_svg_corr${numero_de_l_exercice}${id_unique}`,
          abs0,
          6,
          pas1,
          pas2,
          [
            [l1, x1, x11, true],
            [l2, x2, x22, true],
            [l3, x3, x33, true]
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0]
          ],
          false
        )
      } else {
        // sortie Latex
        texte = Latex_reperage_sur_un_axe(
          2,
          abs0,
          pas1,
          pas2,
          [
            [l1, x1, x11],
            [l2, x2, x22],
            [l3, x3, x33]
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0]
          ],
          false
        )
        texte_corr = Latex_reperage_sur_un_axe(
          2,
          abs0,
          pas1,
          pas2,
          [
            [l1, x1, x11, true],
            [l2, x2, x22, true],
            [l3, x3, x33, true]
          ],
          [
            [calcul(abs0, 0), 0, 0],
            [calcul(abs0 + 1 / pas1, 0), 1, 0]
          ],
          false
        )
        this.liste_questions.push(texte)
        this.liste_corrections.push(texte_corr)
      }
    }
    if (!sortie_html) { liste_de_question_to_contenu(this) }
  }
  this.besoin_formulaire_numerique = [
    'Niveau de difficulté',
    4,
    '1 : Milliers\n2 : Dizaines de mille\n3 : Centaines de mille\n4 : Mélange'
  ]
}
