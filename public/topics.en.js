/* Papote's English topic library: the same 30 topics as topics.js, in the
 * same order and with the same ids, each hand-written in a version for each
 * age band (3-5, 6-9, 10-12, 13-16). The topic of the day stays one shared
 * stream: topics.js stays the source of the ids, this file only translates.
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
      theme: 'Feelings',
      '3-5': {
        q: 'What has made you feel a little scared lately, and what helped you feel better?',
        followups: ['Where in your body did you feel it?', 'Who could comfort you next time?'],
        tip: 'Share a small fear from your own childhood first. Listen without brushing it off.',
      },
      '6-9': {
        q: 'What was the scariest moment of your week, and what made you feel better?',
        followups: ['Where in your body did you feel it?', 'Who could help you next time?'],
        tip: 'Start with a fear from your own childhood. Listen without correcting or reassuring too quickly.',
      },
      '10-12': {
        q: 'Is there something you have been avoiding a little, without quite knowing why?',
        followups: ['How long has that been going on?', 'What would make it easier to face?'],
        tip: 'Do not push for the whole answer: naming the thing, even halfway, is already the step.',
      },
      '13-16': {
        q: 'What is making you doubt yourself the most right now?',
        followups: ['Is it more to do with school, with friends, or both?', 'What would help you see it more clearly?'],
        tip: 'Receive it without fixing it. A teenager who opens up usually wants an ear, not a plan.',
      },
    },
    {
      id: 'jour-parfait',
      theme: 'Imagination',
      '3-5': {
        q: 'If you could do exactly what you wanted tomorrow, what would we do?',
        followups: ['What would we start with in the morning?', 'Who would we take with us?'],
        tip: 'Write their ideas down somewhere: some fit in an afternoon and make proper memories.',
      },
      '6-9': {
        q: 'Describe your perfect day, from waking up to going to sleep.',
        followups: ['What time of day would be the best bit?', 'Who would you spend it with?'],
        tip: 'Draw the day together if the mood takes you: drawing keeps the conversation going.',
      },
      '10-12': {
        q: 'If you organised a day everyone would remember, what would it look like?',
        followups: ['Who would you invite?', 'What would you cut out of an ordinary day?'],
        tip: 'Pick one detail of that day together and make it real within the month.',
      },
      '13-16': {
        q: 'What would a perfect day look like for you today?',
        followups: ['Where would it happen?', 'Would you spend it on your own or with people?'],
        tip: 'Do not take it personally if the perfect day leaves you out: this is the age of building your own world.',
      },
    },
    {
      id: 'fier',
      theme: 'Confidence',
      '3-5': {
        q: 'What is the thing you are proudest of having learned to do?',
        followups: ['Show me how you do it?', 'Who helped you learn?'],
        tip: 'Let them perform it proudly for you: at this age, showing off is part of knowing.',
      },
      '6-9': {
        q: 'What can you do now that you could not do last year?',
        followups: ['When was it hardest?', 'What do you want to learn next?'],
        tip: 'Mention one of your own improvements too: children love knowing parents still learn.',
      },
      '10-12': {
        q: 'What have you been proudest of since the school year started?',
        followups: ['What made it possible?', 'Did anyone notice?'],
        tip: 'Name the road, not just the result: "you stuck with it" beats "you are clever".',
      },
      '13-16': {
        q: 'What have you learned to do on your own this year?',
        followups: ['How has it changed you?', 'What do you want to master on your own next?'],
        tip: 'Respect this growing independence: ask, do not inspect.',
      },
    },
    {
      id: 'copains',
      theme: 'Friends',
      '3-5': {
        q: 'Who did you play with today, and what did you play?',
        followups: ['What is the funniest thing to do together?', 'Who do you sometimes play with at home?'],
        tip: 'Follow the detail of the game, not the list of names: that is where the story is.',
      },
      '6-9': {
        q: 'What makes someone a good friend, to you?',
        followups: ['Who fits that best, do you think?', 'Do you ever fall out? About what?'],
        tip: 'Do not settle their squabbles for them: ask what they tried.',
      },
      '10-12': {
        q: 'What makes you feel comfortable around someone?',
        followups: ['Who is it easiest with?', 'Have you ever felt you had to make an effort?'],
        tip: 'Stay curious about the frictions without dramatising them: at this age they come and go fast.',
      },
      '13-16': {
        q: 'Who do you feel most like yourself with, these days?',
        followups: ['What can you do with that person that you do nowhere else?', 'Have you ever felt you changed to fit a group?'],
        tip: 'Do not hoard the names you overhear: ask what these friendships teach you about them.',
      },
    },
    {
      id: 'dîner-rêve',
      theme: 'Imagination',
      '3-5': {
        q: 'If you could eat your favourite dessert every day, which one would you pick?',
        followups: ['And what would we call your very own dessert?', 'Shall we invent it together one day?'],
        tip: 'Let the fantasy run: an invented dessert can be drawn, it does not have to be cooked.',
      },
      '6-9': {
        q: 'If you could invite anyone to dinner, real or made-up, who would come and what would you eat?',
        followups: ['Where would you eat?', 'What would you talk about first?'],
        tip: 'Play the game fully: lay the table "as if" that very evening.',
      },
      '10-12': {
        q: 'If you cooked a meal for the whole family, what would it be?',
        followups: ['What would you start with?', 'Who would taste it first?'],
        tip: 'Put that meal in the diary for real, however simple: it is the project that counts.',
      },
      '13-16': {
        q: 'You are inviting three people, from any era at all, to dinner. Who, and why?',
        followups: ['What would you eat?', 'Who would you ask the first question?'],
        tip: 'This game says a lot about their idols: listen, then share your own three guests.',
      },
    },
    {
      id: 'école-difficile',
      theme: 'School',
      '3-5': {
        q: 'What is the funniest thing at nursery or school, and the most annoying?',
        followups: ['The annoying bit: how would you do it differently?', 'Who do you tell about it?'],
        tip: 'Keep it light: at this age school is told through small moments, not report cards.',
      },
      '6-9': {
        q: 'What is the hardest part of your school day?',
        followups: ['Does that hard part last long?', 'What makes the afternoon better?'],
        tip: 'Do not offer a solution straight away: first ask what they have already tried.',
      },
      '10-12': {
        q: 'Is there a subject you are finding trickier this year?',
        followups: ['What exactly is the sticking point?', 'What would help you most?'],
        tip: 'Separate the subject from the teacher and the method: the real block is often not where you think.',
      },
      '13-16': {
        q: 'What weighs on you most about school right now?',
        followups: ['Is it the workload, the pressure, or the boredom?', 'If you could change one single thing, what would it be?'],
        tip: 'Listen without defending the institution: be on your child\'s side first, solutions second.',
      },
    },
    {
      id: 'animaux',
      theme: 'Nature',
      '3-5': {
        q: 'If you could be an animal tomorrow, which one would you be?',
        followups: ['Where would you live?', 'What would you eat?'],
        tip: 'Play the animal together for five minutes: the conversation follows the game.',
      },
      '6-9': {
        q: 'Which animal seems the cleverest to you, and why?',
        followups: ['Have you ever seen one for real?', 'What would your animal do in our house?'],
        tip: 'Watch a video or read about the chosen animal straight after: curiosity invites curiosity.',
      },
      '10-12': {
        q: 'If an animal could tell you about its day, which one would be the most interesting?',
        followups: ['What would its day be like, for it?', 'And the most boring one, which would that be?'],
        tip: 'Join in the game: describe your day as an animal of your choice would live it.',
      },
      '13-16': {
        q: 'Is there an animal you feel close to? Why that one?',
        followups: ['What is its best quality, in your eyes?', 'Its biggest struggle?'],
        tip: 'This kind of answer often says something about them: welcome it without decoding it out loud.',
      },
    },
    {
      id: 'souvenir',
      theme: 'Memories',
      '3-5': {
        q: 'What is your best memory from the last holidays?',
        followups: ['What sound was there that day?', 'Shall we do it again soon?'],
        tip: 'Add your own sensory details: little ones remember through their senses.',
      },
      '6-9': {
        q: 'Tell me a memory you remember really well, even if it is not special.',
        followups: ['Why do you think you remember it?', 'Were we there together?'],
        tip: 'Keep this one: a year later, asking about it again makes a lovely dialogue.',
      },
      '10-12': {
        q: 'Which memory from this year would you like to keep safe?',
        followups: ['What would happen if you forgot it?', 'Who would you tell about it in ten years?'],
        tip: 'Share one of yours too: swapping memories beats an interview.',
      },
      '13-16': {
        q: 'Which memory are you most sure of, the one you will never forget?',
        followups: ['What makes it so solid?', 'Has it changed in your head since?'],
        tip: 'Memories like these build identity: listen to them as you would listen to a story you had never heard.',
      },
    },
    {
      id: 'courage',
      theme: 'Courage',
      '3-5': {
        q: 'When did you last do something difficult?',
        followups: ['Were you scared before? And after?', 'Who was with you?'],
        tip: 'Name the courage, not the success: having tried is already the story worth celebrating.',
      },
      '6-9': {
        q: 'What does being brave mean to you?',
        followups: ['Who is the bravest person you know?', 'Have you ever been scared and done it anyway?'],
        tip: 'Separate courage from the absence of fear: courage is feeling afraid and acting anyway.',
      },
      '10-12': {
        q: 'Is there something you would like to dare, but have not yet?',
        followups: ['What is holding you back?', 'What would the first small step be?'],
        tip: 'Offer to take the first step together: daring is lent more easily than it is encouraged.',
      },
      '13-16': {
        q: 'What would you like to dare this year?',
        followups: ['What keeps it out of reach today?', 'What is the worst that could happen if you tried?'],
        tip: 'Ask "and if it worked?" as often as "and if it did not?": optimism is a habit you can train.',
      },
    },
    {
      id: 'maison-idéale',
      theme: 'Imagination',
      '3-5': {
        q: 'If we built a dream house, what amazing room would it have?',
        followups: ['A pool, a slide, a garden? Where would it go?', 'What colour for the walls?'],
        tip: 'Draw the plan together on a sheet of paper: the walls can be pink, it is a dream house.',
      },
      '6-9': {
        q: 'If you built your ideal house, where would it be and what would it look like?',
        followups: ['What would be in your room?', 'Who would we invite?'],
        tip: 'Note down the plan they describe: dream houses say what is missing or what matters.',
      },
      '10-12': {
        q: 'If you drew the home you would live in later, what would be inside it?',
        followups: ['Would it be in town or in the countryside?', 'One room for what, exactly?'],
        tip: 'Listen for the room described at most length: it is often the most revealing.',
      },
      '13-16': {
        q: 'Where do you imagine yourself living in ten years?',
        followups: ['On your own, in a shared flat, with us?', 'What matters most about a place, to you?'],
        tip: 'Do not mourn the "far from us": that dream of independence is exactly the good news.',
      },
    },
    {
      id: 'malin-joyeux',
      theme: 'Joy',
      '3-5': {
        q: 'What makes you laugh the loudest?',
        followups: ['Show me your loudest laugh!', 'Who else laughs like that?'],
        tip: 'Laugh along, properly: your laughter is what teaches them joy is meant to be shared.',
      },
      '6-9': {
        q: 'Tell me the funniest thing that happened to you this week.',
        followups: ['Did you laugh straight away or afterwards?', 'Have you told anyone yet?'],
        tip: 'Do not hunt for the perfect joke: the "tell me again" ritual does the work.',
      },
      '10-12': {
        q: 'What really makes you laugh these days?',
        followups: ['Videos, friends, situations?', 'Do we laugh at the same things, you and me?'],
        tip: 'Answer the question for yourself too: shared humour is a rare bridge at this age.',
      },
      '13-16': {
        q: 'What makes you laugh out loud, even when you are in a bad mood?',
        followups: ['Can you show me?', 'Has your sense of humour changed this year?'],
        tip: 'Laugh without analysing: a teenager who laughs in front of you is opening a rare door.',
      },
    },
    {
      id: 'météo-intérieur',
      theme: 'Feelings',
      '3-5': {
        q: 'If your heart were weather today, what would it be? Sun, clouds, rain?',
        followups: ['Was there a big ray of sunshine today?', 'And a little shower?'],
        tip: 'Play the weather of your own heart too: naming feelings is a job for two.',
      },
      '6-9': {
        q: 'If your mood were the weather today, what would the forecast be?',
        followups: ['Did it change during the day?', 'What puts sunshine into your day?'],
        tip: 'Do not correct the forecast: welcome the rain as warmly as the sun.',
      },
      '10-12': {
        q: 'How are you feeling, really, this week?',
        followups: ['On a scale of 1 to 10, where are you?', 'What would move it up by one?'],
        tip: 'The scale helps them talk without drama: a 5 deserves as much attention as a 2.',
      },
      '13-16': {
        q: 'If you summed up your mood this month in one sentence, what would it say?',
        followups: ['Is it a good stretch, a flat one, or a hard one?', 'What would shift it?'],
        tip: 'Respect the short answers: they often open up more when you do not fill the silence.',
      },
    },
    {
      id: 'écran',
      theme: 'Screens',
      '3-5': {
        q: 'What is your favourite cartoon or book at the moment?',
        followups: ['What happens in it?', 'Which character do you like best?'],
        tip: 'Watch or read a bit of it together: the conversation starts itself.',
      },
      '6-9': {
        q: 'What do you like most in the game or cartoon you are into right now?',
        followups: ['How would you play if screens did not exist?', 'Shall we try it together once?'],
        tip: 'Play a round with them, without any lessons: that is how you understand the fun.',
      },
      '10-12': {
        q: 'Of your screen time, what is genuinely worth it, and what just passes the time?',
        followups: ['How do you feel afterwards?', 'Would you like to do less of it, or not?'],
        tip: 'Decide the limits together rather than imposing them: a rule that is explained holds better.',
      },
      '13-16': {
        q: 'What do you genuinely enjoy in what you watch or play these days?',
        followups: ['How is it like you?', 'Does doing more or less of it change your mood?'],
        tip: 'Ask for the guided tour: being shown someone\'s digital world is a mark of trust.',
      },
    },
    {
      id: 'cœur-héros',
      theme: 'Values',
      '3-5': {
        q: 'Who is your favourite hero?',
        followups: ['What do they do so well?', 'What would you do in their place one day?'],
        tip: 'Take up the role in play: the heroes of early childhood are their first models.',
      },
      '6-9': {
        q: 'What is a hero, to you? Do they need muscles?',
        followups: ['Who around us is a hero without a costume?', 'Have you ever felt like the hero of a story?'],
        tip: 'Bring in the everyday heroes: firefighters, the teacher, the grandad who looks after people.',
      },
      '10-12': {
        q: 'Who do you admire most right now, and for what?',
        followups: ['Is it someone you know, or more of a famous name?', 'What would you want to be like them at?'],
        tip: 'Take the admiration apart: you learn what they value by listening to the why.',
      },
      '13-16': {
        q: 'Who is your role model at the moment, if you have one?',
        followups: ['What quality do they still miss?', 'And you: who do you secretly set an example for?'],
        tip: 'The last question is the strongest one: ask it and let the silence work.',
      },
    },
    {
      id: 'gentillesse',
      theme: 'Values',
      '3-5': {
        q: 'What kind thing did you do today, or what kind thing did someone do for you?',
        followups: ['What is it like to be given something kind?', 'Shall we do it again tomorrow?'],
        tip: 'Point out the small gestures, not the grand ones: kindness shows up in the everyday.',
      },
      '6-9': {
        q: 'Did you see someone being especially kind this week?',
        followups: ['How did that make you feel?', 'Do you think being kind is hard?'],
        tip: 'Run a 24-hour family kindness challenge, and compare notes the next day.',
      },
      '10-12': {
        q: 'Has anyone ever been unkind to you, or have you been unkind to someone? What happened?',
        followups: ['How did it feel at the time?', 'What helped you afterwards?'],
        tip: 'Do not take the judge\'s seat: look with them at how it could have gone differently.',
      },
      '13-16': {
        q: 'Does kindness still count for anything at your age, or does it pass for naive?',
        followups: ['Have you seen any proof of it lately?', 'And yours: do you show it or keep it?'],
        tip: 'Resist the urge to moralise: the question deserves a real grown-up answer for a teenager.',
      },
    },
    {
      id: 'musique',
      theme: 'Music',
      '3-5': {
        q: 'What is your favourite song at the moment?',
        followups: ['Shall we put it on right now?', 'Do you dance to it or sing along?'],
        tip: 'Dance together, even for two minutes: it is the happiest little chat there is.',
      },
      '6-9': {
        q: 'Which song do you know by heart?',
        followups: ['When do you usually sing it?', 'What is that song about?'],
        tip: 'Listen to the words together: what they keep from a song says what touches them.',
      },
      '10-12': {
        q: 'What is your current favourite, the one you play on repeat?',
        followups: ['What energy does it give you?', 'Shall we listen to it together?'],
        tip: 'Actually play it, without commentary: accepting their tastes opens every other subject.',
      },
      '13-16': {
        q: 'What have you been listening to lately, and what does it say about you?',
        followups: ['Where do you find new music: friends, feeds, radio?', 'Will you make me a playlist?'],
        tip: 'A requested playlist is a gift: it may arrive, and then listen to it in full.',
      },
    },
    {
      id: 'métier-rêve',
      theme: 'The future',
      '3-5': {
        q: 'When you are grown up, what do you think you will do?',
        followups: ['Where would you work?', 'Can we play at it now already?'],
        tip: 'Play the job they mentioned this weekend: a four-year-old restaurateur can serve real snacks.',
      },
      '6-9': {
        q: 'What job would you like to do later?',
        followups: ['Why that one?', 'What sort of person does it take?'],
        tip: 'Do not correct the unrealistic: dream jobs say what they love.',
      },
      '10-12': {
        q: 'What job can you picture yourself in, even if nothing is certain?',
        followups: ['What draws you to it: the tasks, the people, or the subject?', 'Do you know what studying it takes?'],
        tip: 'Take an interest in the "why" more than the job: the wishes change, the motivations stay.',
      },
      '13-16': {
        q: 'Where do you picture yourself in five years?',
        followups: ['What would you like to have learned or achieved by then?', 'What is standing in the way today?'],
        tip: 'Talk about direction, not destiny: at this age people draw a direction, not a plan.',
      },
    },
    {
      id: 'famille-histoire',
      theme: 'Family',
      '3-5': {
        q: 'Do you know how Mum and Dad met?',
        followups: ['What do you think we said to each other?', 'Would you like to see a photo of that moment?'],
        tip: 'Family stories told before the age of forgetting imprint forever: tell them often.',
      },
      '6-9': {
        q: 'Would you like me to tell you a true story from when I was little?',
        followups: ['What would you have done in my place?', 'Does it remind you of anything that happens to you?'],
        tip: 'Choose a story where you got it wrong: your vulnerability gives permission for theirs.',
      },
      '10-12': {
        q: 'Do you know where your name comes from?',
        followups: ['Do you like your name?', 'If you could pick another one, which?'],
        tip: 'Tell the story of choosing the name in detail: it is the first personal story anyone owns.',
      },
      '13-16': {
        q: 'Which family story would you like to hear, one I have never told?',
        followups: ['Is there a relative you would like to know better?', 'Who do you feel closest to in the family?'],
        tip: 'A teenager\'s questions deserve the most honest answers there are: give them.',
      },
    },
    {
      id: 'trésor',
      theme: 'Memories',
      '3-5': {
        q: 'If you could keep just one of your toys forever, which would it be?',
        followups: ['Why that one, and not another?', 'Does your toy have a story?'],
        tip: 'Listen to the object\'s story: favourite toys all have a biography.',
      },
      '6-9': {
        q: 'What is your most precious thing?',
        followups: ['Where do you keep it?', 'If we lost it, what would we do?'],
        tip: 'Take a photo of the object and write down its story: the day it breaks, it is all there.',
      },
      '10-12': {
        q: 'Of all your things, which would you pack first if we moved far away?',
        followups: ['Why that one?', 'Are there some you would be ready to give away?'],
        tip: 'Sorting things out with a child this age is a conversation, not a chore.',
      },
      '13-16': {
        q: 'What do you own that is worth the most, money aside?',
        followups: ['How did you get it?', 'Would you keep it your whole life?'],
        tip: 'What teenagers call precious says what they cherish: listen without judging.',
      },
    },
    {
      id: 'nature-jeu',
      theme: 'Nature',
      '3-5': {
        q: 'Let us go for a walk: what shall we look for outside? Leaves, pebbles, birds?',
        followups: ['What colour would the things we are looking for be?', 'Where shall we stick them once we have found them?'],
        tip: 'Make a little "walk museum" on the snack table: the conversation carries on.',
      },
      '6-9': {
        q: 'What do you like best outside: the forest, the sea, the mountains, the park?',
        followups: ['How do you feel out there?', 'When shall we go back?'],
        tip: 'Plan the next outing with them: deciding together is part of the pleasure.',
      },
      '10-12': {
        q: 'What do you like most about being out in nature, when you are really there?',
        followups: ['How does it feel to be far from screens out there?', 'Should we go more often, do you think?'],
        tip: 'Walk side by side for this kind of subject: conversations are easier there than face to face.',
      },
      '13-16': {
        q: 'Is being in nature good for you, or is it just a place you pass through?',
        followups: ['Which natural place do you remember best?', 'Would you happily go back?'],
        tip: 'Offer the outing, let them choose the place and the pace: the setting changes, the principle stays.',
      },
    },
    {
      id: 'courage-quotidien',
      theme: 'School',
      '3-5': {
        q: 'What new thing did you learn this week?',
        followups: ['Was it hard at the start?', 'Do you show it to anyone else?'],
        tip: 'Try the new skill together: teaching a parent is the best learning there is.',
      },
      '6-9': {
        q: 'What did you learn this week that you did not know on Monday?',
        followups: ['What was the most surprising part?', 'Are you pleased with it?'],
        tip: 'Look for what they learned outside school too: knowledge does not only come from lessons.',
      },
      '10-12': {
        q: 'What have you understood recently, not memorised: understood?',
        followups: ['How did it come about?', 'What changes once you have understood?'],
        tip: 'Telling knowing from understanding is a lovely gift: it teaches a different way to revise.',
      },
      '13-16': {
        q: 'What have you learned this year that is not on any syllabus?',
        followups: ['How did you learn it?', 'Who would you tell about it?'],
        tip: 'School teaches subjects; life teaches the rest: take an interest in both.',
      },
    },
    {
      id: 'rêve-nuit',
      theme: 'Imagination',
      '3-5': {
        q: 'Have you had a lovely dream lately that you remember?',
        followups: ['Who was in it?', 'Shall we invent what happens next together?'],
        tip: 'Listen to the dream as a story, without interpreting it: it is their film, theirs alone.',
      },
      '6-9': {
        q: 'If you could choose tonight\'s dream, what would happen in it?',
        followups: ['Where would the dream be set?', 'Would it have a special ending?'],
        tip: 'Invent a dream together, one sentence each in turn: bedtime becomes a game.',
      },
      '10-12': {
        q: 'Do you remember your dreams often?',
        followups: ['The strangest one you can remember?', 'Do you believe dreams mean something?'],
        tip: 'Respect the doubt: asking what they think beats imposing an explanation.',
      },
      '13-16': {
        q: 'Do you still dream, or do you remember nothing at all?',
        followups: ['Is there a recurring dream, sometimes?', 'What do you make of it yourself?'],
        tip: 'A teenager who tells their dreams is telling their worries: listen without decoding out loud.',
      },
    },
    {
      id: 'gratitude',
      theme: 'Joy',
      '3-5': {
        q: 'What made you happy today, even just a little bit?',
        followups: ['And yesterday, what was it?', 'Shall we keep a note of it?'],
        tip: 'Keep a "three small joys" notebook at home: three words each evening is plenty.',
      },
      '6-9': {
        q: 'Name three things from today that did you good.',
        followups: ['Which of the three would you keep?', 'Why that one?'],
        tip: 'Play it at dinner every evening for a week: the ritual becomes a habit of happiness.',
      },
      '10-12': {
        q: 'What was good about your week, even if it was a long one?',
        followups: ['What was in it?', 'What good thing slipped past you?'],
        tip: 'Looking towards the positive is trained: ask the question even after a hard week.',
      },
      '13-16': {
        q: 'What has done you good lately?',
        followups: ['Did you notice it at the time, or only after?', 'Shall we do more of it, together?'],
        tip: 'Do not turn gratitude into homework: welcome the answer, however short.',
      },
    },
    {
      id: 'pièce-identité',
      theme: 'Identity',
      '3-5': {
        q: 'What is your favourite colour?',
        followups: ['Where do you put it around you?', 'Shall we paint something with it?'],
        tip: 'Write down their current preferences: comparing them next year is a wonderful game.',
      },
      '6-9': {
        q: 'If you had to describe yourself in three words, which would they be?',
        followups: ['Why those three?', 'I can see a fourth one in you: want to hear it?'],
        tip: 'Do not debate their three words: add yours with tenderness, if it is asked for.',
      },
      '10-12': {
        q: 'How would you describe who you are to someone who does not know you?',
        followups: ['What defines you most: what you do, or what you like?', 'Are you different at school and at home?'],
        tip: 'Listen without filling in: letting them search is part of how they are built.',
      },
      '13-16': {
        q: 'Do you know who you are, or are you still looking?',
        followups: ['What surprised you about yourself this year?', 'Is there anything about yourself you would like to change?'],
        tip: 'Validate the search itself: nobody is finished at 15, and that is exactly as it should be.',
      },
    },
    {
      id: 'goûter-partagé',
      theme: 'Family',
      '3-5': {
        q: 'Let us invent a tradition just for the two of us: what would it be?',
        followups: ['When would we do it: morning, evening, Sunday?', 'What would we call it?'],
        tip: 'Put it in the calendar for real: an invented tradition holds if you repeat it three times.',
      },
      '6-9': {
        q: 'If we invented a special day just for our family, what would we celebrate?',
        followups: ['How would we celebrate it?', 'What date would we pick?'],
        tip: 'Choose one and write it down: invented family days become major memories.',
      },
      '10-12': {
        q: 'Which family tradition do you like the most?',
        followups: ['Why that one more than the others?', 'Shall you and I invent a new one?'],
        tip: 'Ask which tradition they would keep in their own grown-up family one day: the answer is gold.',
      },
      '13-16': {
        q: 'What do we do as a family that matters to you, even though we never say it?',
        followups: ['Do we keep it, adapt it, drop it?', 'Shall we add one?'],
        tip: 'What a teenager keeps from family traditions is what they will carry: it is an inheritance in the making.',
      },
    },
    {
      id: 'prob-résolution',
      theme: 'Confidence',
      '3-5': {
        q: 'Is there something you cannot quite do yet, that you would like to manage?',
        followups: ['Shall we try it together now?', 'When do you think you will get there?'],
        tip: 'Break the gesture down with them: little ones succeed in little pieces.',
      },
      '6-9': {
        q: 'What is your challenge at the moment?',
        followups: ['Have you started it already?', 'What do you need to get there?'],
        tip: 'Ask "what do you need" rather than "you must": support is offered, not imposed.',
      },
      '10-12': {
        q: 'Is there something you would like to get better at, at school or elsewhere?',
        followups: ['What have you tried already?', 'What plan can we make together?'],
        tip: 'Write the plan on paper, with one step for this week: a written plan is a kept plan.',
      },
      '13-16': {
        q: 'What is your personal challenge right now, grades aside?',
        followups: ['Where are you up to with it?', 'What do you need from me?'],
        tip: 'The last question is the right one: sometimes the answer is "nothing", and that is an answer too.',
      },
    },
    {
      id: 'objet-trouvé',
      theme: 'Curiosity',
      '3-5': {
        q: 'If you found a magic key on the way to school, what would it open?',
        followups: ['What would be behind the door?', 'Shall we go there together?'],
        tip: 'Let the story grow over several days: magic doors open onto weeks of play.',
      },
      '6-9': {
        q: 'If you found a magic key, where would you use it first?',
        followups: ['Would you keep it or share it?', 'Would it have an extra power?'],
        tip: 'Ask again on the way back: today\'s answer can surprise tomorrow\'s.',
      },
      '10-12': {
        q: 'A key that opens any door at all: which one do you open?',
        followups: ['Would you go in alone or with someone?', 'What would you risk, in there?'],
        tip: 'The chosen door says where they want to go: listen without interpreting straight away.',
      },
      '13-16': {
        q: 'A door that opens onto anything at all: do you knock, or do you hesitate?',
        followups: ['What would you most want to peek at behind it?', 'And what would you never want to see?'],
        tip: 'The mix of curiosity and caution at this age is normal: welcome both.',
      },
    },
    {
      id: 'apl-télé',
      theme: 'Screens',
      '3-5': {
        q: 'What is your favourite book for us to read together?',
        followups: ['Shall we read it again tonight?', 'Will you tell it to me in your own words?'],
        tip: 'Let them "read" their own way, even made up: telling is already reading.',
      },
      '6-9': {
        q: 'If you had to tell today like a story, how would it begin?',
        followups: ['Who would be the hero?', 'How would it end?'],
        tip: 'Write the dictated story down: children love seeing their words in print.',
      },
      '10-12': {
        q: 'If you wrote a book, what would it be about?',
        followups: ['Who would the hero be like?', 'Do you think you will really write it one day?'],
        tip: 'Offer a notebook if the bug bites: never correct what is written in it unasked.',
      },
      '13-16': {
        q: 'Is there a story, a film or a series that really marked you?',
        followups: ['What touched you in it?', 'Would you watch it again years from now?'],
        tip: 'What moves a teenager in a story says what counts for them: listen to the reason, not the title.',
      },
    },
    {
      id: 'apl-relation',
      theme: 'Family',
      '3-5': {
        q: 'What would you like to do with me this weekend?',
        followups: ['Where would we do your choice?', 'Shall we invite someone?'],
        tip: 'Actually do their choice, however small: the attention to the choice is the gift.',
      },
      '6-9': {
        q: 'What is your best moment with me that you remember?',
        followups: ['Shall we do it again?', 'What made it so good?'],
        tip: 'The chosen moment says what counts: often it is simple and free.',
      },
      '10-12': {
        q: 'What would you like us to do together more often?',
        followups: ['What stops us?', 'Shall we put it in the calendar?'],
        tip: 'Put it in the calendar in front of them: a promise written down is a promise kept.',
      },
      '13-16': {
        q: 'Do we spend enough time together, in your opinion?',
        followups: ['Too much, not enough, just right?', 'What would we do together if we had more?'],
        tip: 'Accept the answer "just right": a teenager\'s independence is not a withdrawal of love.',
      },
    },
    {
      id: 'partage',
      theme: 'Sharing',
      '3-5': {
        q: 'What do you like lending or sharing with other people?',
        followups: ['And what do you prefer to keep just for you?', 'What shall the two of us share right now?'],
        tip: 'The right to keep some things to yourself is part of sharing: the two are learned together.',
      },
      '6-9': {
        q: 'Is it easy for you to lend your things?',
        followups: ['Have you ever had a problem lending something?', 'How do you handle it, then?'],
        tip: 'Never force the loan: explaining the other person\'s no beats extracting a yes.',
      },
      '10-12': {
        q: 'What do you share easily, and what stays personal to you?',
        followups: ['Does having things of your own matter to you?', 'Where do you draw the line?'],
        tip: 'The need for a space of your own grows with age: naming it avoids many conflicts.',
      },
      '13-16': {
        q: 'What do you consider truly personal, that nobody should touch?',
        followups: ['Is that respected here?', 'And you: do you respect other people\'s?'],
        tip: 'Respecting a teenager\'s privacy is the best way to receive their trust in return.',
      },
    },
  ];

  const api = { topics };
  global.PAPOTE_TOPICS_EN = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);