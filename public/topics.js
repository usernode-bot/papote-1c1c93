/* Papote’s topic library: 30 conversation topics, each written by hand in a
 * version for each age band (3-5, 6-9, 10-12, 13-16). One stream for
 * everyone: the topic of the day is topics[daysSinceEpoch % 30], and the
 * band comes from the child’s age.
 *
 * Content rules: nothing mature, violent or about self-harm — these are
 * questions a parent asks a child over dinner. The 13-16 versions cover
 * school, friends, screens and the future, in the same warm register.
 */
(function (global) {
  'use strict';

  const topics = [
    {
      id: 'peur',
      theme: 'Émotions',
      '3-5': {
        q: 'Qu’est-ce qui t’a fait un peu peur récemment, et qu’est-ce qui t’a aidé à aller mieux ?',
        followups: ['Où dans ton corps l’as-tu senti ?', 'Qui pourrait te réconforter la prochaine fois ?'],
        tip: 'Racontez d’abord une petite peur de votre enfance. Écoutez sans minimiser.',
      },
      '6-9': {
        q: 'Quelle a été ta plus grande peur cette semaine, et qu’est-ce qui t’a fait du bien ?',
        followups: ['Et dans ton corps, tu l’as sentie où ?', 'Qui pourrait t’aider la prochaine fois ?'],
        tip: 'Racontez d’abord une peur de votre enfance. Écoutez sans corriger ni rassurer trop vite.',
      },
      '10-12': {
        q: 'Y a-t-il quelque chose que tu évites un peu, sans savoir trop pourquoi ?',
        followups: ['Depuis combien de temps ?', 'Qu’est-ce qui rendrait ça plus facile à affronter ?'],
        tip: 'Ne poussez pas pour la réponse : nommer la chose, même à moitié, est déjà le pas.',
      },
      '13-16': {
        q: 'Qu’est-ce qui te fait le plus douter en ce moment ?',
        followups: ['C’est plutôt lié à l’école, aux amis, ou aux deux ?', 'Qu’est-ce qui t’aiderait à y voir plus clair ?'],
        tip: 'Accueillez sans résoudre. Un ado qui se confie cherche souvent une oreille, pas un plan.',
      },
    },
    {
      id: 'jour-parfait',
      theme: 'Imagination',
      '3-5': {
        q: 'Si tu pouvais faire exactement ce que tu veux demain, on ferait quoi ?',
        followups: ['On commencerait par quoi, le matin ?', 'On y va avec qui ?'],
        tip: 'Notez ses idées quelque part : certaines tiennent en un après-midi et font des souvenirs.',
      },
      '6-9': {
        q: 'Décris-moi ta journée parfaite, du réveil au coucher.',
        followups: ['Quelle heure serait le meilleur moment de la journée ?', 'Avec qui la passes-tu ?'],
        tip: 'Dessinez la journée ensemble si l’envie vient : le dessin prolonge la conversation.',
      },
      '10-12': {
        q: 'Si tu organisais une journée dont tout le monde se souviendrait, elle ressemblerait à quoi ?',
        followups: ['Qui invites-tu ?', 'Qu’est-ce que tu supprimerais d’une journée normale ?'],
        tip: 'Choisissez ensemble un détail de cette journée et rendez-le vrai dans le mois.',
      },
      '13-16': {
        q: 'À quoi ressemblerait une journée parfaite pour toi aujourd’hui ?',
        followups: ['Elle se passerait où ?', 'Est-ce que tu la vivrais seul ou à plusieurs ?'],
        tip: 'Ne jugez pas si la journée parfaite ne vous inclut pas : c’est l’âge de construire son monde.',
      },
    },
    {
      id: 'fier',
      theme: 'Confiance',
      '3-5': {
        q: 'Quelle est la chose dont tu es le plus content d’avoir apprise à faire ?',
        followups: ['Montre-moi comment tu fais ?', 'Qui t’a aidé à apprendre ?'],
        tip: 'Rejouez la chose avec fierté devant vous : à cet âge, montrer fait partie de savoir.',
      },
      '6-9': {
        q: 'Qu’est-ce que tu sais faire maintenant que tu n’arrivais pas à faire l’année dernière ?',
        followups: ['C’était dur à quel moment ?', 'Qu’est-ce que tu veux apprendre ensuite ?'],
        tip: 'Citez une de vos propres progressions : les enfants aiment savoir que les parents apprennent encore.',
      },
      '10-12': {
        q: 'De quoi es-tu le plus fier depuis la rentrée ?',
        followups: ['Qu’est-ce qui a rendu ça possible ?', 'Est-ce que quelqu’un l’a remarqué ?'],
        tip: 'Nommez le chemin, pas seulement le résultat : « tu as tenu bon » vaut mieux que « tu es fort ».',
      },
      '13-16': {
        q: 'Qu’est-ce que tu as appris à faire seul cette année ?',
        followups: ['Ça t’a changé comment ?', 'Qu’est-ce que tu veux apprendre à faire seul ensuite ?'],
        tip: 'Respectez cette autonomie naissante : demandez, n’inspectez pas.',
      },
    },
    {
      id: 'copains',
      theme: 'Amis',
      '3-5': {
        q: 'Avec qui as-tu joué aujourd’hui, et à quoi ?',
        followups: ['Qu’est-ce qui est le plus rigolo à faire ensemble ?', 'Tu joues parfois à la maison avec qui ?'],
        tip: 'Suivez le détail du jeu, pas la liste des prénoms : c’est là que l’histoire est.',
      },
      '6-9': {
        q: 'C’est quoi, un bon ami, pour toi ?',
        followups: ['Qui correspond le mieux à ça, à ton avis ?', 'Vous vous disputez parfois ? Pour quoi ?'],
        tip: 'Ne tranchez pas les disputes à sa place : demandez ce qu’il ou elle a essayé.',
      },
      '10-12': {
        q: 'Qu’est-ce qui fait que tu te sens bien avec quelqu’un ?',
        followups: ['Avec qui est-ce le plus naturel pour toi ?', 'Est-ce que tu as déjà eu l’impression de devoir faire des efforts ?'],
        tip: 'Restez curieux des tensions sans les dramatiser : à cet âge elles vont et viennent vite.',
      },
      '13-16': {
        q: 'Avec qui tu te sens vraiment toi, ces temps-ci ?',
        followups: ['Qu’est-ce que tu peux faire avec cette personne que tu ne fais nulle part ailleurs ?', 'Est-ce que tu as déjà eu l’impression de changer pour un groupe ?'],
        tip: 'Ne notez pas les prénoms à l’oreille : demandez plutôt ce que ces amitiés vous apprennent de lui ou d’elle.',
      },
    },
    {
      id: 'dîner-rêve',
      theme: 'Imagination',
      '3-5': {
        q: 'Si tu pouvais manger ton dessert préféré tous les jours, lequel tu choisirais ?',
        followups: ['Et on l’appellerait comment, ton dessert à toi ?', 'On l’invente ensemble un jour ?'],
        tip: 'Laissez la fantaisie courir : un dessert inventé peut se dessiner, pas forcément cuisiner.',
      },
      '6-9': {
        q: 'Si tu invitais n’importe qui à dîner, réel ou inventé, qui viendrait et qu’est-ce qu’on mangerait ?',
        followups: ['Vous mangeriez où ?', 'De quoi tu lui parlerais en premier ?'],
        tip: 'Jouez le jeu à fond : mettez la table « comme si » le soir même.',
      },
      '10-12': {
        q: 'Si tu cuisinais un repas pour toute la famille, ce serait quoi ?',
        followups: ['Tu commençais par quoi ?', 'Qui goûterait en premier ?'],
        tip: 'Programmez ce repas pour de vrai, même simple : c’est le projet qui compte.',
      },
      '13-16': {
        q: 'Tu invites trois personnes, de n’importe quelle époque, à dîner. Qui et pourquoi ?',
        followups: ['Vous mangeriez quoi ?', 'À qui tu poserais la première question ?'],
        tip: 'Ce jeu en dit long sur ses idoles : écoutez, puis partagez vos trois invités.',
      },
    },
    {
      id: 'école-difficile',
      theme: 'École',
      '3-5': {
        q: 'Qu’est-ce qui est le plus rigolo à la crèche ou à l’école, et le plus embêtant ?',
        followups: ['Le plus embêtant, tu le ferais comment autrement ?', 'Tu racontes ça à qui ?'],
        tip: 'Restez léger : à cet âge, l’école se raconte par les petits moments, pas les bilans.',
      },
      '6-9': {
        q: 'C’est quoi la partie la plus dure de ta journée d’école ?',
        followups: ['Elle dure longtemps, cette partie dure ?', 'Qu’est-ce qui rend l’après mieux ?'],
        tip: 'Ne proposez pas de solution tout de suite : demandez d’abord ce qu’il ou elle a déjà essayé.',
      },
      '10-12': {
        q: 'Y a-t-il une matière où tu te sens moins à l’aise cette année ?',
        followups: ['C’est quoi exactement, le blocage ?', 'Qu’est-ce qui t’aiderait le plus ?'],
        tip: 'Séparez la matière du prof et de la méthode : le vrai blocage est souvent ailleurs qu’on le croit.',
      },
      '13-16': {
        q: 'Qu’est-ce qui te pèse le plus dans le lycée en ce moment ?',
        followups: ['C’est la charge, la pression, ou l’ennui ?', 'Si tu pouvais changer une seule chose, ce serait quoi ?'],
        tip: 'Écoutez sans défendre l’institution : être du côté de votre enfant d’abord, des solutions ensuite.',
      },
    },
    {
      id: 'animaux',
      theme: 'Nature',
      '3-5': {
        q: 'Si tu pouvais être un animal demain, tu serais lequel ?',
        followups: ['Tu habiterais où ?', 'Qu’est-ce que tu mangerais ?'],
        tip: 'Jouez l’animal ensemble pendant cinq minutes : la conversation suit le jeu.',
      },
      '6-9': {
        q: 'Quel animal te semble le plus malin, et pourquoi ?',
        followups: ['Tu en as déjà vu un en vrai ?', 'Il ferait quoi, ton animal, dans notre maison ?'],
        tip: 'Regardez une vidéo ou un livre sur l’animal choisi juste après : la curiosité appelle la curiosité.',
      },
      '10-12': {
        q: 'Si un animal pouvait te raconter sa journée, lequel serait le plus intéressant ?',
        followups: ['Sa journée serait quoi, pour lui ?', 'Et la plus ennuyeuse, ce serait laquelle ?'],
        tip: 'Emparez-vous du jeu : décrivez votre journée comme la vivrait un animal de votre choix.',
      },
      '13-16': {
        q: 'Y a-t-il un animal dont tu te sens proche ? Pourquoi lui ?',
        followups: ['C’est quoi sa qualité principale, selon toi ?', 'Sa plus grosse contrainte ?'],
        tip: 'Ce genre de réponse dit souvent quelque chose de soi : accueillez-la sans la décoder à voix haute.',
      },
    },
    {
      id: 'souvenir',
      theme: 'Souvenirs',
      '3-5': {
        q: 'Quel est ton plus beau souvenir des dernières vacances ?',
        followups: ['Il y avait quel bruit, ce jour-là ?', 'On le refait bientôt ?'],
        tip: 'Ajoutez vos propres détails sensoriels : les tout-petits mémorisent par les sens.',
      },
      '6-9': {
        q: 'Raconte-moi un souvenir dont tu te souviens très bien, même s’il n’est pas spécial.',
        followups: ['Pourquoi crois-tu que tu t’en souviennes ?', 'On y était ensemble ?'],
        tip: 'Gardez ce souvenir : un an plus tard, le demander de nouveau fait un beau dialogue.',
      },
      '10-12': {
        q: 'Quel souvenir de cette année voudrais-tu garder précieusement ?',
        followups: ['Que se passerait-il si tu l’oubliais ?', 'Tu le raconterais à qui dans dix ans ?'],
        tip: 'Dites le vôtre aussi : l’échange de souvenirs vaut mieux qu’un interrogatoire.',
      },
      '13-16': {
        q: 'Quel est le souvenir dont tu es le plus certain, celui que tu n’oublieras pas ?',
        followups: ['Qu’est-ce qui le rend si solide ?', 'Est-ce qu’il a changé depuis, dans ta tête ?'],
        tip: 'Ces souvenirs fondent l’identité : écoutez-les comme on écoute une histoire qu’on ne connaissait pas.',
      },
    },
    {
      id: 'courage',
      theme: 'Courage',
      '3-5': {
        q: 'Quand est-ce que tu as fait quelque chose de difficile récemment ?',
        followups: ['Tu avais peur avant ? Après ?', 'Qui était avec toi ?'],
        tip: 'Nommez le courage, pas la réussite : avoir essayé est déjà l’histoire à célébrer.',
      },
      '6-9': {
        q: 'C’est quoi pour toi, être courageux ?',
        followups: ['Qui est la personne la plus courageuse que tu connais ?', 'Tu as déjà eu peur et fait quand même ?'],
        tip: 'Distinguez le courage de l’absence de peur : le courage, c’est avoir peur et agir.',
      },
      '10-12': {
        q: 'Y a-t-il quelque chose que tu voudrais oser, sans l’avoir encore osé ?',
        followups: ['Qu’est-ce qui te retient ?', 'Quel serait le premier petit pas ?'],
        tip: 'Proposez de faire le premier pas ensemble : l’audace se prête mieux qu’elle ne s’encourage.',
      },
      '13-16': {
        q: 'Qu’est-ce que tu voudrais oser cette année ?',
        followups: ['Qu’est-ce qui t’en éloigne aujourd’hui ?', 'Qu’est-ce qui se passerait de pire si tu essayais ?'],
        tip: 'Demandez « et si ça marchait ? » autant que « et si ça ratait ? » : l’optimisme s’entraîne.',
      },
    },
    {
      id: 'maison-idéale',
      theme: 'Imagination',
      '3-5': {
        q: 'Si on construisait une maison de rêve, elle aurait quelle pièce extraordinaire ?',
        followups: ['Une piscine, un toboggan, un jardin ? Où ? ', 'Quelle couleur pour les murs ?'],
        tip: 'Dessinez le plan ensemble sur une feuille : les murs peuvent être roses, c’est la maison de rêve.',
      },
      '6-9': {
        q: 'Si tu construisais ta maison idéale, elle serait où et à quoi elle ressemblerait ?',
        followups: ['Qu’est-ce qu’il y aurait dans ta chambre ?', 'On l’inviterait qui ?'],
        tip: 'Notez le plan qu’il ou elle décrit : les maisons de rêve disent ce qui manque ou compte.',
      },
      '10-12': {
        q: 'Si tu dessinais la maison où tu vivrais plus tard, qu’est-ce qu’il y aurait dedans ?',
        followups: ['Elle serait en ville ou à la campagne ?', 'Une pièce pour quoi, exactement ?'],
        tip: 'Écoutez la pièce qu’il ou elle décrit le plus longuement : c’est souvent la plus révélatrice.',
      },
      '13-16': {
        q: 'Dans dix ans, tu t’imagine où vivre ?',
        followups: ['Seul, en colocation, avec nous autres ?', 'Qu’est-ce qui compte le plus dans un endroit, pour toi ?'],
        tip: 'Ne tristez pas sur « loin de nous » : ce rêve d’indépendance est exactement la bonne nouvelle.',
      },
    },
    {
      id: 'malin-joyeux',
      theme: 'Joie',
      '3-5': {
        q: 'Qu’est-ce qui te fait rire le plus fort ?',
        followups: ['Montre-moi ton rire le plus fort !', 'Qui d’autre rit comme ça ?'],
        tip: 'Riez avec, vraiment : votre rire est ce qui lui apprend que la joie se partage.',
      },
      '6-9': {
        q: 'Raconte-moi le truc le plus drôle qui t’est arrivé cette semaine.',
        followups: ['Tu as ri tout de suite ou après coup ?', 'Tu l’as déjà raconté à quelqu’un ?'],
        tip: 'Ne cherchez pas la blague parfaite : la ritournelle du « raconte encore » fait le travail.',
      },
      '10-12': {
        q: 'Qu’est-ce qui te fait vraiment rire ces temps-ci ?',
        followups: ['Des vidéos, des amis, des situations ?', 'Est-ce qu’on rit de la même chose, toi et moi ?'],
        tip: 'Répondez à la question pour vous aussi : l’humour partagé est un pont rare à cet âge.',
      },
      '13-16': {
        q: 'Qu’est-ce qui te fait rire aux éclats, même quand tu es de mauvaise humeur ?',
        followups: ['Tu peux me montrer ?', 'Est-ce que ton humour a changé cette année ?'],
        tip: 'Riez sans analyser : un ado qui rit devant vous vous ouvre une porte rare.',
      },
    },
    {
      id: 'météo-intérieur',
      theme: 'Émotions',
      '3-5': {
        q: 'Si ton cœur était une météo aujourd’hui, il ferait quoi ? Soleil, nuages, pluie ?',
        followups: ['Il y a eu un gros rayon de soleil aujourd’hui ?', 'Et une petite averse ?'],
        tip: 'Jouez la météo de votre propre cœur aussi : nommer les émotions se fait à deux.',
      },
      '6-9': {
        q: 'Si ton humeur était la météo aujourd’hui, quel temps ferait-il ?',
        followups: ['Est-ce qu’il a changé dans la journée ?', 'Qu’est-ce qui met du soleil dans ta journée ?'],
        tip: 'Ne corrigez pas la météo : accueillez la pluie comme le soleil.',
      },
      '10-12': {
        q: 'Comment tu te sens, vraiment, cette semaine ?',
        followups: ['Sur une échelle de 1 à 10, où tu en es ?', 'Qu’est-ce qui ferait monter d’un point ?'],
        tip: 'L’échelle aide à parler sans drame : un 5 mérite autant d’attention qu’un 2.',
      },
      '13-16': {
        q: 'Si tu résumais ton humeur du mois en une phrase, elle dirait quoi ?',
        followups: ['C’est plutôt une bonne période, une plate, une dure ?', 'Qu’est-ce qui la ferait bouger ?'],
        tip: 'Respectez les réponses courtes : elles ouvrent souvent sur plus quand on ne les remplit pas.',
      },
    },
    {
      id: 'écran',
      theme: 'Écrans',
      '3-5': {
        q: 'Quel est ton dessin animé ou ton livre préféré en ce moment ?',
        followups: ['Il se passe quoi, dedans ?', 'Quel personnage tu aimes le plus ?'],
        tip: 'Regardez ou lisez un passage avec lui ou elle : la conversation vient toute seule.',
      },
      '6-9': {
        q: 'Qu’est-ce que tu aimes le plus dans ton jeu ou ton dessin animé du moment ?',
        followups: ['Tu jouerais comment si l’écran n’existait pas ?', 'On essaie ensemble une fois ?'],
        tip: 'Jouez une partie avec lui ou elle, sans leçons : c’est ainsi qu’on comprend le plaisir.',
      },
      '10-12': {
        q: 'Sur ton temps d’écran, qu’est-ce qui vaut vraiment la peine, et qu’est-ce qui passe le temps ?',
        followups: ['Comment tu le sens après ?', 'Tu voudrais en faire moins, ou pas ?'],
        tip: 'Décidez des limites ensemble plutôt que d’imposer : une règle expliquée se tient mieux.',
      },
      '13-16': {
        q: 'Qu’est-ce qui te plaît vraiment dans ce que tu regardes ou joues ces temps-ci ?',
        followups: ['Ça te ressemble comment ?', 'Est-ce que ça change ton humeur, d’en faire plus ou moins ?'],
        tip: 'Demandez la visite guidée : faire visiter son monde numérique est une marque de confiance.',
      },
    },
    {
      id: 'cœur-héros',
      theme: 'Valeurs',
      '3-5': {
        q: 'Qui est ton héros ou ton héroïne préféré ?',
        followups: ['Il ou elle fait quoi, de si bien ?', 'Tu ferais quoi à sa place un jour ?'],
        tip: 'Reprenez le rôle au jeu : les héros de l’enfance sont ses premiers modèles.',
      },
      '6-9': {
        q: 'Qu’est-ce qu’un héros, pour toi ? Il en faut des muscles ?',
        followups: ['Qui, autour de nous, est un héros sans costume ?', 'Tu t’es déjà senti héros d’une histoire ?'],
        tip: 'Amenez les héros du quotidien : les pompiers, la maîtresse, le grand-père qui soigne.',
      },
      '10-12': {
        q: 'Qui tu admires le plus en ce moment, et pour quoi ?',
        followups: ['Est-ce quelqu’un que tu connais, ou plutôt une personnalité ?', 'Tu voudrais être comme lui ou elle sur quel point ?'],
        tip: 'Décortiquez l’admiration : on apprend ce qu’il ou elle valorise en écoutant pourquoi.',
      },
      '13-16': {
        q: 'Qui est ton modèle en ce moment, si tu en as un ?',
        followups: ['Quelle qualité lui manque, quand même ?', 'Et toi, pour qui es-tu un modèle, sans le savoir ?'],
        tip: 'La dernière question est la plus forte : posez-la et laissez le silence faire.',
      },
    },
    {
      id: 'gentillesse',
      theme: 'Valeurs',
      '3-5': {
        q: 'Qu’est-ce que tu as fait de gentil aujourd’hui, ou qu’on a fait de gentil pour toi ?',
        followups: ['Ça fait quoi, de recevoir quelque chose de gentil ?', 'On en refait demain ?'],
        tip: 'Relevez les petits gestes, pas les grands : la gentillesse se repère au quotidien.',
      },
      '6-9': {
        q: 'Tu as vu quelqu’un être particulièrement gentil cette semaine ?',
        followups: ['Qu’est-ce que ça t’a fait ?', 'Tu penses que c’est difficile, la gentillesse ?'],
        tip: 'Faites un « défi gentillesse » de 24h en famille, et racontez-le le lendemain.',
      },
      '10-12': {
        q: 'Est-ce qu’on a déjà été méchant avec toi, ou toi avec quelqu’un ? Qu’est-ce qui s’est passé ?',
        followups: ['Comment tu l’as vécu ?', 'Qu’est-ce qui t’a aidé, après ?'],
        tip: 'Ne prenez pas le rôle du juge : cherchez avec lui ou elle ce qui aurait pu se passer autrement.',
      },
      '13-16': {
        q: 'Est-ce que la gentillesse a encore de la valeur à ton âge, ou ça passe pour naïf ?',
        followups: ['Tu en as vu des preuves, ces derniers temps ?', 'Et la tienne, tu la montres ou tu la gardes ?'],
        tip: 'Résistez à la tentation de morale : la question mérite une vraie réponse d’adulte à ado.',
      },
    },
    {
      id: 'musique',
      theme: 'Musique',
      '3-5': {
        q: 'Quelle est ta chanson préférée, en ce moment ?',
        followups: ['On la met tout de suite ?', 'Tu danses ou tu chantes dessus ?'],
        tip: 'Dansez ensemble, même deux minutes : c’est la papote la plus joyeuse qui existe.',
      },
      '6-9': {
        q: 'Quelle chanson tu connais par cœur ?',
        followups: ['Tu la chantes quand, d’habitude ?', 'Elle dit quoi, cette chanson ?'],
        tip: 'Écoutez les paroles ensemble : ce qu’il ou elle retient d’une chanson dit ce qui touche.',
      },
      '10-12': {
        q: 'C’est quoi ta musique du moment, celle que tu écoutes en boucle ?',
        followups: ['Qu’est-ce qu’elle te donne, comme énergie ?', 'On l’écoute ensemble ?'],
        tip: 'Mettez-la vraiment, sans remarque : accepter ses goûts ouvre tous les autres sujets.',
      },
      '13-16': {
        q: 'Qu’est-ce que tu écoutes ces temps-ci, et qu’est-ce que ça dit de toi ?',
        followups: ['Tu découvre la musique par où : amis, réseaux, radio ?', 'Tu m’en fais une playlist ?'],
        tip: 'La playlist demandée est un cadeau : elle arrivera peut-être, écoutez-la en entier.',
      },
    },
    {
      id: 'métier-rêve',
      theme: 'Avenir',
      '3-5': {
        q: 'Quand tu seras grand, tu feras quoi, tu crois ?',
        followups: ['Tu travailleras où ?', 'On peut déjà jouer à ça maintenant ?'],
        tip: 'Jouez au métier évoqué ce week-end : un restaurateur de 4 ans peut servir un vrai goûter.',
      },
      '6-9': {
        q: 'Tu voudrais faire quel métier plus tard ?',
        followups: ['Pourquoi celui-là ?', 'Il faut être comment pour le faire ?'],
        tip: 'Ne corrigez pas l’irréaliste : les métiers de rêve disent ce qu’il ou elle aime.',
      },
      '10-12': {
        q: 'Tu t’imagine dans quel métier, même si ce n’est pas certain ?',
        followups: ['Ce qui t’attire dedans : les gestes, les gens, ou le sujet ?', 'Quelles études il faut, tu sais ?'],
        tip: 'Intéressez-vous au « pourquoi » plus qu’au métier : les envies changent, les motivations restent.',
      },
      '13-16': {
        q: 'Tu t’imagine où dans cinq ans ?',
        followups: ['Qu’est-ce que tu voudrais avoir appris ou accompli ?', 'Qu’est-ce qui t’en empêche aujourd’hui ?'],
        tip: 'Parlez de la direction, pas du destin : à cet âge on trace des axes, pas des plans.',
      },
    },
    {
      id: 'famille-histoire',
      theme: 'Famille',
      '3-5': {
        q: 'Tu sais comment on s’est rencontrés, papa et maman ?',
        followups: ['À ton avis, on s’est dit quoi ?', 'Tu veux voir une photo de ce moment-là ?'],
        tip: 'Les histoires de famille avant l’âge de l’oubli s’impriment pour toujours : racontez-les souvent.',
      },
      '6-9': {
        q: 'Tu veux que je te raconte une histoire vraie de quand j’étais petit ?',
        followups: ['Tu aurais fait quoi, à ma place ?', 'Elle ressemble à quelque chose qui t’arrive ?'],
        tip: 'Choisissez une histoire où vous vous êtes trompé : la vulnérabilité autorise la leur.',
      },
      '10-12': {
        q: 'Tu sais d’où vient ton prénom ?',
        followups: ['Tu l’aimes bien, ton prénom ?', 'Si tu pouvais en choisir un autre, lequel ?'],
        tip: 'Racontez le choix du prénom en détail : c’est la première histoire personnelle qu’on possède.',
      },
      '13-16': {
        q: 'Quelle histoire de la famille tu voudrais qu’on te raconte, que je n’ai jamais dite ?',
        followups: ['Il y a un membre de la famille que tu voudrais mieux connaître ?', 'Tu te sens proche de qui, dans la famille ?'],
        tip: 'Ce sont les questions d’ado qui méritent les réponses les plus honnêtes : donnez-les.',
      },
    },
    {
      id: 'trésor',
      theme: 'Souvenirs',
      '3-5': {
        q: 'Si tu gardais un seul de tes jouets pour toujours, ce serait lequel ?',
        followups: ['Pourquoi lui, et pas un autre ?', 'Il a une histoire, ton joujou ?'],
        tip: 'Écoutez l’histoire de l’objet : les jouets préférés ont tous une biographie.',
      },
      '6-9': {
        q: 'C’est quoi ton objet le plus précieux ?',
        followups: ['Où tu le gardes ?', 'Si on le perdait, on ferait quoi ?'],
        tip: 'Prenez l’objet en photo et notez son histoire : le jour où il casera, tout est là.',
      },
      '10-12': {
        q: 'Parmi tes affaires, laquelle garderais-tu en priorité si on déménageait loin ?',
        followups: ['Pourquoi celle-là ?', 'Y en a-t-il que tu es prêt à donner ?'],
        tip: 'Le tri des affaires avec un enfant de cet âge est une conversation, pas une corvée.',
      },
      '13-16': {
        q: 'Qu’est-ce que tu possèdes qui vaut le plus, sans parler d’argent ?',
        followups: ['Tu l’as eu comment ?', 'Le garderais-tu toute ta vie ?'],
        tip: 'Ce que les ados appellent précieux dit ce qu’ils chérissent : écoutez sans porter de jugement.',
      },
    },
    {
      id: 'nature-jeu',
      theme: 'Nature',
      '3-5': {
        q: 'On va se promener : tu veux qu’on cherche quoi, dehors ? Des feuilles, des cailloux, des oiseaux ?',
        followups: ['De quelle couleur, ce qu’on cherche ?', 'On les colle où, une fois trouvés ?'],
        tip: 'Faites un petit « musée de la promenade » sur la table du goûter : la conversation continue.',
      },
      '6-9': {
        q: 'Qu’est-ce que tu préfères dehors : la forêt, la mer, la montagne, le parc ?',
        followups: ['Tu t’y sens comment, là-bas ?', 'On y retourne quand ?'],
        tip: 'Planifiez la prochaine sortie avec lui ou elle : décider ensemble fait partie du plaisir.',
      },
      '10-12': {
        q: 'Qu’est-ce qui te plaît le plus dans la nature, quand tu y es vraiment ?',
        followups: ['Tu te sens comment, loin des écrans là-bas ?', 'On y va plus souvent, à ton avis ?'],
        tip: 'Marchez côte à côte pour ce genre de sujet : les conversations y sont plus faciles que face à face.',
      },
      '13-16': {
        q: 'Est-ce que la nature te fait du bien, ou c’est juste un endroit où on passe ?',
        followups: ['Quel endroit naturel tu te souviens le mieux ?', 'Tu y retournerais volontiers ?'],
        tip: 'Proposez la sortie, laissez choisir le lieu et le rythme : le cadre change, le principe reste.',
      },
    },
    {
      id: 'courage-quotidien',
      theme: 'École',
      '3-5': {
        q: 'Qu’est-ce que tu as appris de nouveau cette semaine ?',
        followups: ['C’était dur, au début ?', 'Tu le montres à quelqu’un d’autre ?'],
        tip: 'Reprenez le nouveau geste ensemble : enseigner à son parent est le meilleur des apprentissages.',
      },
      '6-9': {
        q: 'Qu’est-ce que tu as appris cette semaine que tu ne savais pas lundi ?',
        followups: ['C’était quoi, le plus surprenant ?', 'Tu en es content ?'],
        tip: 'Cherchez ce qu’il ou elle a appris hors de l’école aussi : le savoir ne vient pas que des leçons.',
      },
      '10-12': {
        q: 'Qu’est-ce que tu as compris récemment, pas appris par cœur : compris ?',
        followups: ['Comment c’est venu ?', 'Ça change quoi, une fois qu’on a compris ?'],
        tip: 'Distinguer savoir et comprendre est un beau cadeau : cela apprend à réviser autrement.',
      },
      '13-16': {
        q: 'Qu’est-ce que tu as appris cette année qui ne figure dans aucun cours ?',
        followups: ['Comment tu l’as appris ?', 'Tu le raconterais à qui ?'],
        tip: 'L’école apprend des matières ; la vie apprend le reste : intéressez-vous aux deux.',
      },
    },
    {
      id: 'rêve-nuit',
      theme: 'Imagination',
      '3-5': {
        q: 'Tu as fait un beau rêve, récemment, dont tu te souviens ?',
        followups: ['Il y avait qui, dedans ?', 'On l’invente la suite ensemble ?'],
        tip: 'Écoutez le rêve comme une histoire, sans l’interpréter : c’est son film à lui ou à elle.',
      },
      '6-9': {
        q: 'Si tu pouvais choisir ton rêve de ce soir, il se passerait quoi dedans ?',
        followups: ['Il serait où, ce rêve ?', 'Il y aurait une fin spéciale ?'],
        tip: 'Inventez un rêve à deux, chacun son tour une phrase : le coucher devient un jeu.',
      },
      '10-12': {
        q: 'Est-ce que tu te souviens de tes rêves souvent ?',
        followups: ['Le plus étrange dont tu te souviennes ?', 'Tu y crois, aux rêves qui disent quelque chose ?'],
        tip: 'Respectez le doute : demander ce qu’il ou elle en pense vaut mieux qu’imposer une explication.',
      },
      '13-16': {
        q: 'Est-ce que tu rêves encore, ou tu ne te souviens de rien ?',
        followups: ['Y a-t-il un rêve récurrent, des fois ?', 'Qu’est-ce que tu en déduis, toi ?'],
        tip: 'Un ado qui raconte ses rêves raconte ses préoccupations : écoutez sans décoder à voix haute.',
      },
    },
    {
      id: 'gratitude',
      theme: 'Joie',
      '3-5': {
        q: 'Qu’est-ce qui t’a fait plaisir aujourd’hui, juste un petit peu ?',
        followups: ['Et hier, c’était quoi ?', 'On en garde une trace ?'],
        tip: 'Tenez un carnet de « trois petites joies » à la maison : trois mots par soir suffisent.',
      },
      '6-9': {
        q: 'Nomme trois choses de la journée qui t’ont fait du bien.',
        followups: ['Laquelle des trois tu garderais ?', 'Pourquoi elle ?'],
        tip: 'Jouez-y au dîner chaque soir de la semaine : le rituel devient une habitude de bonheur.',
      },
      '10-12': {
        q: 'Qu’est-ce qui a été bien dans ta semaine, même si elle a été longue ?',
        followups: ['Qui y a-t-il eu dedans ?', 'Qu’est-ce qui t’a échappé, de bien ?'],
        tip: 'Le regard vers le positif s’entraîne : posez la question même quand la semaine fut dure.',
      },
      '13-16': {
        q: 'Qu’est-ce qui t’a fait du bien, ces derniers temps ?',
        followups: ['Tu t’en rendais compte sur le moment, ou après ?', 'On en fait plus, ensemble ?'],
        tip: 'Ne transformez pas la gratitude en devoir : accueillez la réponse, même courte.',
      },
    },
    {
      id: 'pièce-identité',
      theme: 'Identité',
      '3-5': {
        q: 'C’est quoi, ta couleur préférée ?',
        followups: ['Tu la mets où, autour de toi ?', 'On peint quelque chose avec ?'],
        tip: 'Notez ses préférences du moment : les comparer l’année prochaine est un jeu merveilleux.',
      },
      '6-9': {
        q: 'Si tu devais te décrire en trois mots, ce serait lesquels ?',
        followups: ['Pourquoi ces trois-là ?', 'Moi, je t’en vois un quatrième : tu veux l’entendre ?'],
        tip: 'Ne discutez pas ses trois mots : ajoutez le vôtre avec tendresse, s’il est demandé.',
      },
      '10-12': {
        q: 'Comment tu décrirais qui tu es, à quelqu’un qui ne te connaît pas ?',
        followups: ['Ce qui te définit le plus : ce que tu fais, ou ce que tu aimes ?', 'Tu es différent à l’école et à la maison ?'],
        tip: 'Écoutez sans compléter : laisser chercher fait partie de la construction.',
      },
      '13-16': {
        q: 'Est-ce que tu sais qui tu es, ou tu es encore en train de le chercher ?',
        followups: ['Qu’est-ce qui t’a surpris sur toi, cette année ?', 'Il y a quelque chose que tu voudrais changer de toi ?'],
        tip: 'Validez la recherche elle-même : personne n’est fini à 15 ans, et c’est très bien ainsi.',
      },
    },
    {
      id: 'goûter-partagé',
      theme: 'Famille',
      '3-5': {
        q: 'On invente une tradition à nous deux : elle serait quoi ?',
        followups: ['On la fait quand : le matin, le soir, le dimanche ?', 'Elle s’appellerait comment ?'],
        tip: 'Mettez-la au calendrier pour de vrai : une tradition inventée tient si on la répète trois fois.',
      },
      '6-9': {
        q: 'Si on inventait une fête juste pour notre famille, on fêterait quoi ?',
        followups: ['On la célébrerait comment ?', 'Quelle date on choisirait ?'],
        tip: 'Choisissez-en une et notez-la : les fêtes de famille inventées deviennent des souvenirs majeurs.',
      },
      '10-12': {
        q: 'Quelle est la tradition de famille que tu aimes le plus ?',
        followups: ['Pourquoi elle, plus que les autres ?', 'On en invente une nouvelle, toi et moi ?'],
        tip: 'Demandez quelle tradition il ou elle garderait à son tour dans sa famille d’adulte : la réponse vaut de l’or.',
      },
      '13-16': {
        q: 'Qu’est-ce qu’on fait en famille qui compte pour toi, même si on ne le dit pas ?',
        followups: ['On le garde, on l’adapte, on le laisse tomber ?', 'On en ajoute un ?'],
        tip: 'Ce que l’ado garde des traditions familiales est ce qu’il emportera : c’est une héritage en train de se faire.',
      },
    },
    {
      id: 'prob-résolution',
      theme: 'Confiance',
      '3-5': {
        q: 'Il y a quelque chose que tu n’arrives pas encore à faire, et que tu voudrais réussir ?',
        followups: ['On essaie ensemble maintenant ?', 'Tu crois que tu y arriveras quand ?'],
        tip: 'Décomposez le geste avec lui ou elle : les tout-petits réussissent par petits morceaux.',
      },
      '6-9': {
        q: 'C’est quoi ton défi en ce moment ?',
        followups: ['Tu l’as déjà commencé ?', 'De quoi tu as besoin pour y arriver ?'],
        tip: 'Demandez « de quoi as-tu besoin » plutôt que « il faut que tu » : le soutien se propose, ne s’impose.',
      },
      '10-12': {
        q: 'Y a-t-il quelque chose que tu voudrais améliorer, à l’école ou ailleurs ?',
        followups: ['Qu’est-ce que tu as déjà essayé ?', 'Quel plan on peut faire ensemble ?'],
        tip: 'Écrivez le plan sur papier, avec une étape pour cette semaine : un plan écrit est un plan tenu.',
      },
      '13-16': {
        q: 'Quel est ton défi perso du moment, hors des notes ?',
        followups: ['Où tu en es dedans ?', 'Tu as besoin de quoi, de moi ?'],
        tip: 'La dernière question est la bonne : parfois la réponse est « rien », et c’est aussi une réponse.',
      },
    },
    {
      id: 'objet-trouvé',
      theme: 'Curiosité',
      '3-5': {
        q: 'Si tu trouvais une clé magique sur le chemin de l’école, elle ouvrirait quoi ?',
        followups: ['Derrière la porte, il y aurait quoi ?', 'On y va ensemble ?'],
        tip: 'Laissez l’histoire grandir plusieurs jours : les portes magiques ouvrent sur des semaines de jeu.',
      },
      '6-9': {
        q: 'Si tu trouvais une clé magique, tu l’utiliserais où, en premier ?',
        followups: ['Tu la garderais ou tu la partagerais ?', 'Elle aurait un pouvoir en plus ?'],
        tip: 'Posez la question de retour : sa réponse d’aujourd’hui peut étonner celle de demain.',
      },
      '10-12': {
        q: 'Une clé qui ouvre n’importe quelle porte : tu ouvres laquelle ?',
        followups: ['Tu y vas seul ou accompagné ?', 'Qu’est-ce que tu risques, là-bas ?'],
        tip: 'La porte choisie dit où il ou elle veut aller : écoutez sans interpréter tout de suite.',
      },
      '13-16': {
        q: 'Une porte qui s’ouvre sur n’importe quoi, tu la frappes ou tu hésites ?',
        followups: ['Derrière quoi, tu voudrais regarder, à tout prix ?', 'Et ce que tu ne voudrais jamais voir ?'],
        tip: 'Le mélange de curiosité et de prudence à cet âge est normal : accueillez les deux.',
      },
    },
    {
      id: 'apl-télé',
      theme: 'Écrans',
      '3-5': {
        q: 'Quel est ton livre préféré qu’on lit ensemble ?',
        followups: ['On le relit ce soir ?', 'Tu me le racontes avec tes mots ?'],
        tip: 'Laissez-le ou elle « lire » à sa façon, même inventé : raconter est déjà lire.',
      },
      '6-9': {
        q: 'Si tu devais raconter notre journée d’aujourd’hui comme une histoire, elle commencerait comment ?',
        followups: ['Qui serait le héros ?', 'Comment elle finirait ?'],
        tip: 'Écrivez l’histoire dictée sur papier : les enfants adorent voir leurs mots imprimés.',
      },
      '10-12': {
        q: 'Si tu écrivais un livre, il parlerait de quoi ?',
        followups: ['Le héros ressemble à qui ?', 'Tu l’écris vraiment un jour, tu crois ?'],
        tip: 'Offrez un carnet si l’envie s’en mêle : ne corrigez jamais ce qui s’y écrit sans demande.',
      },
      '13-16': {
        q: 'Il y a une histoire, un film ou une série qui t’a vraiment marqué ?',
        followups: ['Qu’est-ce qui t’a touché dedans ?', 'Tu la regarderais encore, des années plus tard ?'],
        tip: 'Ce qui touche un ado dans une histoire dit ce qui compte pour lui : écoutez la raison, pas le titre.',
      },
    },
    {
      id: 'apl-relation',
      theme: 'Famille',
      '3-5': {
        q: 'Tu veux faire quoi avec moi ce week-end ?',
        followups: ['On le fait où, ton choix ?', 'On invite quelqu’un ?'],
        tip: 'Faites vraiment son choix, même petit : l’attention au choix est le cadeau.',
      },
      '6-9': {
        q: 'C’est quoi ton meilleur moment avec moi, dont tu te souviens ?',
        followups: ['On le refait ?', 'Qu’est-ce qui l’a rendu si bien ?'],
        tip: 'Le moment choisi dit ce qui compte : souvent, c’est simple et gratuit.',
      },
      '10-12': {
        q: 'Qu’est-ce que tu voudrais qu’on fasse ensemble plus souvent ?',
        followups: ['Qu’est-ce qui nous en empêche ?', 'On le met au calendrier ?'],
        tip: 'Mettez-le au calendrier devant lui ou elle : une promesse notée est une promesse tenue.',
      },
      '13-16': {
        q: 'Est-ce qu’on passe assez de temps ensemble, à ton avis ?',
        followups: ['Trop, pas assez, bien comme ça ?', 'Ce qu’on ferait ensemble, si on en avait plus ?'],
        tip: 'Acceptez la réponse « bien comme ça » : l’indépendance de l’ado n’est pas un retrait d’amour.',
      },
    },
    {
      id: 'partage',
      theme: 'Partage',
      '3-5': {
        q: 'Qu’est-ce que tu aimes prêter ou partager avec les autres ?',
        followups: ['Et qu’est-ce que tu préfères garder pour toi ?', 'On partage quoi, tous les deux, maintenant ?'],
        tip: 'Le droit de garder certaines choses pour soi fait partie du partage : les deux s’apprennent ensemble.',
      },
      '6-9': {
        q: 'Est-ce que c’est facile pour toi, de prêter tes affaires ?',
        followups: ['Tu as déjà eu un souci en prêtant quelque chose ?', 'Comment tu fais, alors ?'],
        tip: 'Ne forcez jamais le prêt : expliquer le refus de l’autre vaut mieux qu’arracher un accord.',
      },
      '10-12': {
        q: 'Qu’est-ce que tu partages facilement, et qu’est-ce qui reste perso pour toi ?',
        followups: ['C’est important pour toi, d’avoir des choses à soi ?', 'Où est-ce que tu mets la limite ?'],
        tip: 'Le besoin d’un espace à soi grandit avec l’âge : le nommer évite bien des conflits.',
      },
      '13-16': {
        q: 'Qu’est-ce que tu considères vraiment personnel, que personne ne devrait toucher ?',
        followups: ['Est-ce qu’on le respecte, ici ?', 'Et toi, tu respectes le leur, celui des autres ?'],
        tip: 'Respecter l’intimité d’un ado est la meilleure façon de recevoir sa confiance en retour.',
      },
    },
  ];

  function bandFor(age) {
    if (age <= 5) return '3-5';
    if (age <= 9) return '6-9';
    if (age <= 12) return '10-12';
    return '13-16';
  }

  const api = { topics, bandFor };
  global.PAPOTE_TOPICS = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
