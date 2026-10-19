/* Papote's English word library: the same 30 words as words.js, in the
 * same order and with the same ids, each hand-written in a version for
 * each age band (3-5, 6-9, 10-12, 13-16). The word of the day stays one
 * shared stream: words.js stays the source of the ids, this file only
 * translates.
 *
 * Content rules: nothing mature, violent or about self-harm — these are
 * words a parent explores with a child over dinner. Everyday, kind words
 * only, in every band.
 */
(function (global) {
  'use strict';

  const words = [
    {
      id: 'partager',
      kind: 'verb',
      word: 'to share',
      '3-5': {
        def: 'Letting someone have or use part of what is yours.',
        synonyms: ['to give some', 'to take turns'],
        example: 'Leo shares his blocks with his little sister.',
        associations: ['a cake cut into slices', 'taking turns', 'a toy used together'],
        tip: 'Find three things you each shared today, then act one out for the other to guess.'
      },
      '6-9': {
        def: 'To give part of what you have to someone else, or to use it together.',
        synonyms: ['to divide up', 'to let someone join in'],
        example: 'Emma shares her sandwich with her friend who forgot his lunch.',
        associations: ['a sandwich cut in two', 'a game played together', 'a secret told to a friend'],
        tip: 'Play "you cut, I choose": one of you cuts the snack, the other picks the half.'
      },
      '10-12': {
        def: 'To use something together with others, or to tell them your ideas.',
        synonyms: ['to divide up', 'to swap'],
        example: 'Malik shares his notes with the whole class before the test.',
        associations: ['notes passed around', 'a pizza shared fairly', 'an idea told out loud'],
        tip: 'Ask your child to teach you one thing they learned today — sharing knowledge is sharing too.'
      },
      '13-16': {
        def: 'To have, use or experience something together with other people.',
        synonyms: ['to pool', 'to open up'],
        example: 'Louise shares her playlist with the whole family on long drives.',
        associations: ['a shared playlist', 'a post sent to a friend', 'a burden split in two'],
        tip: 'Share something of your own — a memory, a song, a worry — and see what comes back.'
      }
    },
    {
      id: 'courage',
      kind: 'noun',
      word: 'courage',
      '3-5': {
        def: 'Being brave when something feels hard or a little scary.',
        synonyms: ['being brave', 'a strong heart'],
        example: 'Chloe finds the courage to go down the big slide.',
        associations: ['a first day of school', 'a tall slide', 'a small superhero'],
        tip: 'Name the brave thing out loud together, then do it once, slowly.'
      },
      '6-9': {
        def: 'The strength you need to do something that scares you a little.',
        synonyms: ['bravery', 'being bold'],
        example: 'Noah shows courage when he raises his hand in front of the whole class.',
        associations: ['a raised hand', 'a wobbly tooth', 'deep water and one big jump'],
        tip: 'Ask: "What is one brave thing you did today that nobody noticed?"'
      },
      '10-12': {
        def: 'The ability to face something difficult or frightening instead of avoiding it.',
        synonyms: ['bravery', 'nerve'],
        example: 'It took courage for Emma to tell her friend the truth.',
        associations: ['a hard conversation', 'a needle at the doctor\'s', 'standing up for someone'],
        tip: 'Share a time courage was hard for you, and what helped you get through it.'
      },
      '13-16': {
        def: 'Doing what you believe is right even when it costs you something.',
        synonyms: ['guts', 'moral strength'],
        example: 'It takes courage to say no when everyone else says yes.',
        associations: ['a hard no', 'standing alone against the crowd', 'sending the first message'],
        tip: 'Ask about a time saying the right thing felt harder than saying nothing.'
      }
    },
    {
      id: 'généreux',
      kind: 'adj',
      word: 'generous',
      '3-5': {
        def: 'Happy to give things to other people.',
        synonyms: ['giving', 'sharing'],
        example: 'Leo is generous and gives his friend the bigger cookie.',
        associations: ['a bigger half', 'a gift wrapped in paper', 'a blanket offered'],
        tip: 'Hide a small treat somewhere and let your child be generous by giving it away.'
      },
      '6-9': {
        def: 'Someone who likes to give, share and help without expecting anything back.',
        synonyms: ['giving', 'kind-hearted'],
        example: 'Emma is generous: she shares her colored pencils with the whole table.',
        associations: ['a pencil case open to all', 'a birthday gift', 'a seat given up'],
        tip: 'Play "generous day": each of you gives away one thing — a turn, a treat, a compliment.'
      },
      '10-12': {
        def: 'Willing to give more of something, like time or attention, than people expect.',
        synonyms: ['giving', 'big-hearted'],
        example: 'Malik is generous with his time and helps Louise with her math.',
        associations: ['time given for free', 'a hand offered', 'a lunch shared'],
        tip: 'Ask who has been generous with your child lately, and how it felt.'
      },
      '13-16': {
        def: 'Giving freely — time, help, attention — without counting what comes back.',
        synonyms: ['open-handed', 'giving'],
        example: 'It was generous of Chloe to spend her whole afternoon helping at the shelter.',
        associations: ['a door held open', 'an hour given', 'a plate refilled'],
        tip: 'Talk about generosity that costs nothing — a compliment, patience, a second chance.'
      }
    },
    {
      id: 'imaginer',
      kind: 'verb',
      word: 'to imagine',
      '3-5': {
        def: 'Making pictures in your head of things that are not there.',
        synonyms: ['to make believe', 'to pretend'],
        example: 'Noah imagines his bed is a big pirate ship.',
        associations: ['a blanket fort', 'a box that becomes a car', 'a cloud shaped like a dragon'],
        tip: 'Close your eyes together and picture a place — then describe it to each other.'
      },
      '6-9': {
        def: 'To picture things in your mind that you cannot see yet.',
        synonyms: ['to picture', 'to make up'],
        example: 'Louise imagines what her cat does all day while she is at school.',
        associations: ['a secret animal world', 'a made-up ending', 'a drawing from the mind'],
        tip: 'Invent a story together: you say one sentence, your child says the next.'
      },
      '10-12': {
        def: 'To form an idea or picture of something that is not real, or not here yet.',
        synonyms: ['to envision', 'to dream up'],
        example: 'Chloe imagines the city she would build if she were mayor for a year.',
        associations: ['an invention sketched on paper', 'an alternate ending', 'a plan for the future'],
        tip: 'Ask your child to design a room, a tool or a planet — and explain how it works.'
      },
      '13-16': {
        def: 'To picture what could be: a future, a solution, a different point of view.',
        synonyms: ['to envision', 'to conceive'],
        example: 'Noah imagines what his street will look like in twenty years.',
        associations: ['a future sketched out', 'a life swapped for a day', 'a solution nobody sees yet'],
        tip: 'Ask what their life at twenty-five looks like in their head — then what the first step would be.'
      }
    },
    {
      id: 'curiosité',
      kind: 'noun',
      word: 'curiosity',
      '3-5': {
        def: 'Wanting to look, touch and learn about everything.',
        synonyms: ['wonder', 'wanting to know'],
        example: 'Emma\'s curiosity makes her watch the ladybug for a long time.',
        associations: ['a ladybug watched up close', 'a box that rattles', 'a hundred questions a day'],
        tip: 'Answer your child\'s question with: "Good question — what do YOU think?"'
      },
      '6-9': {
        def: 'The wish to know how things work and why things happen.',
        synonyms: ['interest', 'a questioning mind'],
        example: 'Malik\'s curiosity leads him to take apart the old radio with his dad.',
        associations: ['a magnifying glass', 'a why-question at dinner', 'a library card'],
        tip: 'Keep a family question jar: drop in questions, pull one out each week to explore.'
      },
      '10-12': {
        def: 'A strong interest in learning about things, people and how the world works.',
        synonyms: ['an inquiring mind', 'interest'],
        example: 'Louise reads the whole encyclopedia page out of pure curiosity.',
        associations: ['a documentary watched to the end', 'a question that leads to ten more', 'a hobby picked up overnight'],
        tip: 'Ask for the strangest fact they learned this week — then go find out why it is true.'
      },
      '13-16': {
        def: 'An open mind that wants to understand people, ideas and the world beyond school.',
        synonyms: ['an inquiring mind', 'open-mindedness'],
        example: 'Noah\'s curiosity makes him read articles nobody assigned in class.',
        associations: ['a podcast queued up', 'a question asked without shame', 'a map of places to visit'],
        tip: 'Ask what topic they would explore if grades did not exist — then be curious about their answer.'
      }
    },
    {
      id: 'calme',
      kind: 'adj',
      word: 'calm',
      '3-5': {
        def: 'Quiet and slow, not worried.',
        synonyms: ['quiet', 'still'],
        example: 'Chloe stays calm when her block tower falls down.',
        associations: ['a sleeping cat', 'slow breathing', 'a still lake'],
        tip: 'Breathe like a balloon together three times: big breath in, slow breath out.'
      },
      '6-9': {
        def: 'Quiet and peaceful, without rushing or getting upset.',
        synonyms: ['peaceful', 'steady'],
        example: 'Noah stays calm and finishes the puzzle even when the timer is almost done.',
        associations: ['a slow Sunday morning', 'deep breaths before a test', 'a cat in a sunbeam'],
        tip: 'Try a one-minute "calm race": whoever sits the stillest and breathes the slowest wins.'
      },
      '10-12': {
        def: 'Peaceful and not worried; staying relaxed when things go wrong.',
        synonyms: ['level-headed', 'peaceful'],
        example: 'Emma stays calm before her recital and takes three slow breaths backstage.',
        associations: ['three slow breaths', 'a walk without headphones', 'a quiet room after school'],
        tip: 'Find your child\'s calm spot — a song, a walk, a drawing — and use it before big moments.'
      },
      '13-16': {
        def: 'Not disturbed by stress or strong feelings; steady under pressure.',
        synonyms: ['composed', 'level-headed'],
        example: 'Malik stays calm when the group project starts falling apart the night before.',
        associations: ['pressure and steady hands', 'a walk to clear your head', 'a pause before answering'],
        tip: 'Ask what calms them when school gets loud — and tell them what calms you, honestly.'
      }
    },
    {
      id: 'écouter',
      kind: 'verb',
      word: 'to listen',
      '3-5': {
        def: 'Using your ears and paying attention.',
        synonyms: ['to hear', 'to pay attention'],
        example: 'Leo listens to the whole story without moving.',
        associations: ['ears like satellite dishes', 'a bedtime story', 'a bird singing outside'],
        tip: 'Play "sound hunt": sit still for one minute and name every sound you both hear.'
      },
      '6-9': {
        def: 'To pay attention to what someone says, or to a sound.',
        synonyms: ['to pay attention', 'to lend an ear'],
        example: 'Emma listens to her grandfather\'s story until the very end.',
        associations: ['a story told at dinner', 'a song turned up', 'an ear pressed to a door'],
        tip: 'Repeat back what your child just said before answering — it changes the conversation.'
      },
      '10-12': {
        def: 'To pay real attention to someone\'s words, or to sounds, without interrupting.',
        synonyms: ['to pay attention', 'to tune in'],
        example: 'Malik really listens while Louise explains her idea for the science fair.',
        associations: ['a podcast on a walk', 'a friend who hears you out', 'an album played start to finish'],
        tip: 'Once a day, put your phone down and just listen for two whole minutes.'
      },
      '13-16': {
        def: 'To give someone your full attention — to their words and to what they mean.',
        synonyms: ['to hear someone out', 'to lend an ear'],
        example: 'Chloe listens without interrupting while her friend talks about the move.',
        associations: ['a conversation without a screen', 'a friend heard out to the end', 'music on good headphones'],
        tip: 'Ask one question, then three more, before saying anything about yourself.'
      }
    },
    {
      id: 'amitié',
      kind: 'noun',
      word: 'friendship',
      '3-5': {
        def: 'When two people like each other and play together.',
        synonyms: ['being friends', 'liking each other'],
        example: 'Emma and Louise\'s friendship started in the sandbox.',
        associations: ['holding hands', 'a playdate', 'a picture drawn for a friend'],
        tip: 'Ask your child to name one thing their friend did today that made them smile.'
      },
      '6-9': {
        def: 'When you like someone a lot and enjoy being with them.',
        synonyms: ['being friends', 'a bond'],
        example: 'Noah and Malik\'s friendship grows stronger every recess.',
        associations: ['a secret handshake', 'a seat saved for you', 'two bikes side by side'],
        tip: 'Ask what makes someone a good friend — then ask whether they have been that today.'
      },
      '10-12': {
        def: 'A close bond between people who trust and like each other.',
        synonyms: ['a bond', 'a close tie'],
        example: 'Chloe\'s friendship with Emma survived a whole year in different schools.',
        associations: ['a bond tested by distance', 'a laugh shared in the hallway', 'a secret kept safe'],
        tip: 'Ask how their longest friendship has changed since they met — and what stayed the same.'
      },
      '13-16': {
        def: 'A relationship built on trust, honesty and showing up for each other.',
        synonyms: ['a bond', 'loyalty'],
        example: 'Noah learns that real friendship means telling your friend the truth, kindly.',
        associations: ['showing up anyway', 'a group chat at midnight', 'a friend who tells you the truth'],
        tip: 'Ask who they would call at 2 a.m. — and why that person.'
      }
    },
    {
      id: 'fier',
      kind: 'adj',
      word: 'proud',
      '3-5': {
        def: 'Very happy about something you did.',
        synonyms: ['glad', 'pleased'],
        example: 'Leo is proud of the tower he built all by himself.',
        associations: ['a drawing held up high', 'a cereal-box medal', 'shoes tied alone'],
        tip: 'Ask your child to show you their proudest moment today — then clap loudly.'
      },
      '6-9': {
        def: 'Happy and satisfied about something you did, or about who you are.',
        synonyms: ['glad', 'pleased'],
        example: 'Emma is proud of her book report, even with one spelling mistake.',
        associations: ['a grade taped to the fridge', 'a race finished', 'a song played for the family'],
        tip: 'Ask "what are you proud of today?" instead of "how was school?"'
      },
      '10-12': {
        def: 'Feeling deep satisfaction in something you achieved or in who you are.',
        synonyms: ['pleased', 'satisfied'],
        example: 'Malik feels proud when his team finally wins after losing all season.',
        associations: ['a finished project', 'a personal best', 'a family honored'],
        tip: 'Let them overhear you saying you are proud of them — tell someone else where they can hear.'
      },
      '13-16': {
        def: 'Feeling real satisfaction in your work, your choices or who you are.',
        synonyms: ['pleased with yourself', 'self-assured'],
        example: 'Louise is proud of the essay she rewrote three times to get it right.',
        associations: ['work finished properly', 'a value held firm', 'a family you stand tall for'],
        tip: 'Ask what they are proud of that nobody has noticed yet — then notice it.'
      }
    },
    {
      id: 'grandir',
      kind: 'verb',
      word: 'to grow',
      '3-5': {
        def: 'Getting bigger and taller.',
        synonyms: ['to get bigger', 'to grow up'],
        example: 'Noah grows taller every month, like the sunflower in the garden.',
        associations: ['marks on the door frame', 'new shoes again', 'a sunflower past the fence'],
        tip: 'Measure your child against the door frame today and compare with last year.'
      },
      '6-9': {
        def: 'To become bigger, taller or more grown-up.',
        synonyms: ['to get taller', 'to grow up'],
        example: 'Chloe grows three centimeters and finally reaches the big bike.',
        associations: ['a plant on the windowsill', 'pants that get too short', 'a new responsibility'],
        tip: 'Ask what growing up means besides getting taller — one grown-up thing they can do now.'
      },
      '10-12': {
        def: 'To get bigger or taller, or to develop as a person.',
        synonyms: ['to develop', 'to mature'],
        example: 'Louise grows more confident every time she speaks in front of the class.',
        associations: ['a sapling becoming a tree', 'skills stacking up', 'last year\'s clothes'],
        tip: 'Ask how they have changed inside this year — what they believe now that they did not before.'
      },
      '13-16': {
        def: 'To grow up: to change in body, mind and character, year after year.',
        synonyms: ['to mature', 'to come of age'],
        example: 'Noah has grown so much this year — he handles setbacks differently now.',
        associations: ['a voice changing', 'an old photo', 'a world getting wider'],
        tip: 'Tell them one way they have grown that they cannot see from the inside.'
      }
    },
    {
      id: 'voyage',
      kind: 'noun',
      word: 'journey',
      '3-5': {
        def: 'Going somewhere far from home, by car, train or plane.',
        synonyms: ['a trip', 'a journey'],
        example: 'Emma\'s journey to grandma\'s house takes three hours by train.',
        associations: ['a suitcase packed', 'a window seat', 'a map on the wall'],
        tip: 'Pack a small bag of surprises for the trip and hand one out each hour.'
      },
      '6-9': {
        def: 'A trip from one place to another, often far away.',
        synonyms: ['a trip', 'a journey'],
        example: 'Malik\'s journey to the mountains is his first time seeing snow.',
        associations: ['a train window', 'a passport stamp', 'a road that curves'],
        tip: 'Let your child plan one day of the trip — route, snacks, stops — and follow it.'
      },
      '10-12': {
        def: 'A journey to a place far from home, long or short.',
        synonyms: ['a journey', 'an expedition'],
        example: 'Chloe\'s journey across the country teaches her how big the world really is.',
        associations: ['a backpack and a plan', 'a new language half-understood', 'a landscape that changes'],
        tip: 'Ask which trip they would take if they could go anywhere — and what they would pack first.'
      },
      '13-16': {
        def: 'A journey, near or far, that changes how you see the world.',
        synonyms: ['a journey', 'an expedition'],
        example: 'Noah\'s journey to visit his cousin abroad was the first time he traveled alone.',
        associations: ['a first solo trip', 'a border crossed', 'home left behind for a while'],
        tip: 'Ask about a trip they would take alone someday — and what they would want to find there.'
      }
    },
    {
      id: 'drôle',
      kind: 'adj',
      word: 'funny',
      '3-5': {
        def: 'Making you laugh.',
        synonyms: ['silly', 'amusing'],
        example: 'Leo tells a funny story about a dog wearing a hat.',
        associations: ['a silly face', 'a joke about a chicken', 'a sock puppet show'],
        tip: 'Have a silly-face contest: the first one to laugh makes the next face.'
      },
      '6-9': {
        def: 'Something or someone that makes you laugh.',
        synonyms: ['amusing', 'silly'],
        example: 'Noah draws a funny cat that thinks it is a loaf of bread.',
        associations: ['a knock-knock joke', 'a pet doing something weird', 'a joke from school'],
        tip: 'Trade jokes at dinner tonight — the worst joke wins dessert.'
      },
      '10-12': {
        def: 'Making people laugh, sometimes in an unexpected way.',
        synonyms: ['amusing', 'hilarious'],
        example: 'Louise\'s funny imitation of the science teacher makes the whole bus laugh.',
        associations: ['a joke that lands', 'a story told with voices', 'a friend who cracks you up'],
        tip: 'Ask what made them laugh hardest this week — laughter is worth remembering out loud.'
      },
      '13-16': {
        def: 'Amusing in a way that can be sharp or surprising; humor that sticks.',
        synonyms: ['hilarious', 'amusing'],
        example: 'Chloe has a funny way of describing school that makes even her dad laugh.',
        associations: ['humor as a bridge', 'a running joke', 'a joke told at exactly the right second'],
        tip: 'Share the joke you find funniest — humor is one way to really know someone.'
      }
    },
    {
      id: 'découvrir',
      kind: 'verb',
      word: 'to discover',
      '3-5': {
        def: 'Finding something you did not know was there.',
        synonyms: ['to find', 'to see for the first time'],
        example: 'Emma discovers a snail under the big leaf.',
        associations: ['a shell in the sand', 'a box opened', 'a snail under a leaf'],
        tip: 'Go on a ten-minute "discovery walk" and find five things you never noticed.'
      },
      '6-9': {
        def: 'To find something new, or to learn it for the first time.',
        synonyms: ['to find out', 'to come across'],
        example: 'Noah discovers that bread rises because of tiny living things called yeast.',
        associations: ['a new book opened', 'a bug under a rock', 'a new word learned'],
        tip: 'Ask one "how does that work?" question a day — and find the answer together.'
      },
      '10-12': {
        def: 'To find out something for the first time, or to notice something that was hidden.',
        synonyms: ['to find out', 'to come across'],
        example: 'Malik discovers a shortcut to school that saves him ten minutes every day.',
        associations: ['a fact that changes your mind', 'a talent you did not know you had', 'a blank spot on the map filled in'],
        tip: 'Try one new thing this week as a family — a food, a route, a game — and compare notes.'
      },
      '13-16': {
        def: 'To come to know something or someone new — a place, an idea, a part of yourself.',
        synonyms: ['to find out', 'to stumble upon'],
        example: 'Louise discovers she loves astronomy after one clear night with a borrowed telescope.',
        associations: ['a passion found by accident', 'a city wandered without a plan', 'an artist nobody knows yet'],
        tip: 'Ask what they discovered about themselves this year that surprised them.'
      }
    },
    {
      id: 'confiance',
      kind: 'noun',
      word: 'trust',
      '3-5': {
        def: 'Believing someone will take care of you.',
        synonyms: ['believing in someone', 'feeling safe'],
        example: 'Leo has trust in his dad and jumps into his open arms.',
        associations: ['a jump into open arms', 'a hand held tight', 'a secret kept'],
        tip: 'Play a trust game: let your child lead you around the room with your eyes closed.'
      },
      '6-9': {
        def: 'Believing someone is honest and will not let you down.',
        synonyms: ['believing in someone', 'reliance'],
        example: 'Emma earns the trust of her teacher by returning the borrowed book on time.',
        associations: ['a promise kept', 'a key given', 'a secret told'],
        tip: 'Give your child one real responsibility today and show them you trust them with it.'
      },
      '10-12': {
        def: 'The feeling that you can rely on someone — or on yourself.',
        synonyms: ['reliance', 'faith in someone'],
        example: 'Chloe\'s parents show trust by letting her walk to her friend\'s house alone.',
        associations: ['a promise kept for weeks', 'a first solo errand', 'a secret given to keep'],
        tip: 'Ask: "When has someone trusted you — and did it make you want to deserve it?"'
      },
      '13-16': {
        def: 'Firm belief in someone\'s honesty, or in your own ability.',
        synonyms: ['faith', 'self-assurance'],
        example: 'Noah\'s trust in his teammate makes the whole project go twice as fast.',
        associations: ['a key to the house', 'a secret shared', 'a self worth believing in'],
        tip: 'Talk about how trust is built slowly and broken fast — and what rebuilds it.'
      }
    },
    {
      id: 'doux',
      kind: 'adj',
      word: 'gentle',
      '3-5': {
        def: 'Soft to touch, or quiet and kind.',
        synonyms: ['soft', 'sweet'],
        example: 'The kitten is gentle and falls asleep in Emma\'s hands.',
        associations: ['a kitten\'s fur', 'a lullaby', 'a whisper'],
        tip: 'Find the softest thing in the house together — then find the softest voice.'
      },
      '6-9': {
        def: 'Soft to touch, or quiet and kind with people and animals.',
        synonyms: ['soft', 'kind'],
        example: 'Noah speaks in a gentle voice so he does not wake the baby.',
        associations: ['a blanket from the dryer', 'a whisper', 'a pet stroked slowly'],
        tip: 'Do one gentle thing tonight: a quiet voice, a slow walk, a soft blanket.'
      },
      '10-12': {
        def: 'Kind and careful, not rough or loud; soft to the touch.',
        synonyms: ['kind', 'mild'],
        example: 'Louise is gentle with the new student and shows him where everything is.',
        associations: ['a voice lowered for a scared animal', 'a hand on a shoulder', 'rain instead of a storm'],
        tip: 'Ask who was gentle with them this week — and who they were gentle with.'
      },
      '13-16': {
        def: 'Kind and calm in a way that puts people at ease; mild, not harsh.',
        synonyms: ['kind', 'mild'],
        example: 'Chloe gives her little brother some gentle advice before his first day of high school.',
        associations: ['a well-chosen soft word', 'a calm morning', 'strength that does not need to shout'],
        tip: 'Ask what gentleness looks like between friends when one of them is struggling.'
      }
    },
    {
      id: 'aider',
      kind: 'verb',
      word: 'to help',
      '3-5': {
        def: 'Doing something to make things easier for someone.',
        synonyms: ['to lend a hand', 'to give a hand'],
        example: 'Leo helps his mom carry the small bags.',
        associations: ['a hand offered', 'a friend\'s shoelace tied', 'a bandage put on'],
        tip: 'Let your child help with a real chore today, even if it takes much longer.'
      },
      '6-9': {
        def: 'To make something easier for someone, or to do part of their work.',
        synonyms: ['to lend a hand', 'to give a hand'],
        example: 'Emma helps her little brother build the difficult part of the fort.',
        associations: ['a hand reached out', 'homework explained', 'a heavy bag carried'],
        tip: 'Ask who helped your child today — and who your child helped.'
      },
      '10-12': {
        def: 'To make someone\'s work or problem easier, with actions or advice.',
        synonyms: ['to lend a hand', 'to assist'],
        example: 'Malik helps his neighbor carry her groceries up three floors.',
        associations: ['an elbow during a hard climb', 'a shortcut explained', 'a seat given up'],
        tip: 'Ask where helping felt good today — and where it was hard to accept help.'
      },
      '13-16': {
        def: 'To give someone what they need — effort, time, support — when they cannot manage alone.',
        synonyms: ['to support', 'to give a hand'],
        example: 'Louise helps her friend study every Thursday until the exam.',
        associations: ['a hand up, not a handout', 'a seat saved', 'an hour given for free'],
        tip: 'Ask what kind of help actually helps them — advice, silence, or just company.'
      }
    },
    {
      id: 'surprise',
      kind: 'noun',
      word: 'surprise',
      '3-5': {
        def: 'Something unexpected that makes you say "Oh!"',
        synonyms: ['a wonder', 'an unexpected thing'],
        example: 'Noah gets a surprise when he opens his lunchbox and finds a note inside.',
        associations: ['a box that rattles', 'a hidden drawing', 'a cake with a secret color inside'],
        tip: 'Hide a small note in their pocket for them to find later — a real surprise.'
      },
      '6-9': {
        def: 'Something that happens when you did not expect it.',
        synonyms: ['the unexpected', 'a wonder'],
        example: 'Chloe\'s friends plan a surprise for her last day of school.',
        associations: ['a gift hidden behind a back', 'a cake with a hidden layer', 'a friend at the door'],
        tip: 'Plan a tiny surprise together for someone else — the planning is half the fun.'
      },
      '10-12': {
        def: 'Something unexpected — a nice event, a discovery or a twist.',
        synonyms: ['the unexpected', 'a twist'],
        example: 'Emma gets a surprise when her science experiment works better than expected.',
        associations: ['a plot twist', 'a gift hidden in plain sight', 'a skill appearing out of nowhere'],
        tip: 'Ask about the best surprise they ever got — and one they would like to give.'
      },
      '13-16': {
        def: 'Something unexpected, from a small twist to a big change of plan.',
        synonyms: ['a twist', 'the unexpected'],
        example: 'Noah plans a surprise visit to his grandmother for her birthday.',
        associations: ['a plan flipped upside down', 'a gift nobody saw coming', 'a plot twist in a series'],
        tip: 'Ask whether they like surprises or hate them — and what makes the difference.'
      }
    },
    {
      id: 'prudent',
      kind: 'adj',
      word: 'careful',
      '3-5': {
        def: 'Doing things slowly and safely so nothing bad happens.',
        synonyms: ['careful', 'safe'],
        example: 'Emma is careful and holds the railing on the stairs.',
        associations: ['a helmet buckled', 'small steps on ice', 'a hand on the railing'],
        tip: 'Praise the careful thing they did today, not just the fast and brave thing.'
      },
      '6-9': {
        def: 'Doing things in a safe way and thinking before acting.',
        synonyms: ['cautious', 'thoughtful'],
        example: 'Noah is careful and checks both ways before crossing the street on his bike.',
        associations: ['look twice, cross once', 'a helmet clicked on', 'a test double-checked'],
        tip: 'Ask them to teach you the safety rule they know best — being the teacher makes it stick.'
      },
      '10-12': {
        def: 'Thinking before acting, so you avoid mistakes and danger.',
        synonyms: ['cautious', 'thoughtful'],
        example: 'Louise is careful with her words and rereads her message before sending it.',
        associations: ['a message reread before sending', 'a first-aid kit', 'a plan B ready'],
        tip: 'Talk about a time being careful paid off — and a time rushing cost you.'
      },
      '13-16': {
        def: 'Acting with care and thought for risks and consequences.',
        synonyms: ['cautious', 'level-headed'],
        example: 'Chloe is careful online: she checks who she is talking to before sharing anything.',
        associations: ['a password guarded', 'a contract read to the end', 'a risk weighed honestly'],
        tip: 'Ask where they think being careful matters most right now — listen before you answer.'
      }
    },
    {
      id: 'essayer',
      kind: 'verb',
      word: 'to try',
      '3-5': {
        def: 'Doing your best at something new, even if it is hard.',
        synonyms: ['to have a go', 'to give it a shot'],
        example: 'Malik tries to tie his shoe, even though it is hard.',
        associations: ['shoelaces, attempt one', 'a bike without training wheels', 'a first bite of broccoli'],
        tip: 'Celebrate the try, not the result: "You tried three times — that is the best part."'
      },
      '6-9': {
        def: 'To do your best at something new or difficult.',
        synonyms: ['to have a go', 'to give it a shot'],
        example: 'Chloe tries the high bar at the playground for the very first time.',
        associations: ['a first bite of something new', 'a bike without training wheels', 'a puzzle piece tried every way'],
        tip: 'Use the phrase "not yet" instead of "I can\'t" — together, all week.'
      },
      '10-12': {
        def: 'To make an effort at something, even when success is not certain.',
        synonyms: ['to attempt', 'to give it a shot'],
        example: 'Emma tries out for the school play, even though she is nervous.',
        associations: ['a first audition', 'a recipe tried for the third time', 'a new sport, day one'],
        tip: 'Share something you tried and failed at — and why you are glad you tried.'
      },
      '13-16': {
        def: 'To make a real effort, knowing you might not succeed.',
        synonyms: ['to attempt', 'to make an effort'],
        example: 'Noah tries out for the debate team without knowing if he will make it.',
        associations: ['a first attempt in public', 'an application sent', 'a door knocked on'],
        tip: 'Ask what they would try if failing cost nothing — then ask what is actually stopping them.'
      }
    },
    {
      id: 'souvenir',
      kind: 'noun',
      word: 'memory',
      '3-5': {
        def: 'Something you remember from before, like a happy day.',
        synonyms: ['a memory', 'something remembered'],
        example: 'Leo keeps a happy memory of the day he learned to swim.',
        associations: ['a photo album', 'a shell kept in a pocket', 'a birthday remembered'],
        tip: 'Ask your child for their favorite memory from this week — write it down together.'
      },
      '6-9': {
        def: 'Something you remember from the past, like a happy moment.',
        synonyms: ['a memory', 'a keepsake'],
        example: 'Emma\'s best memory of the summer is catching tadpoles with her cousin.',
        associations: ['a photo in a drawer', 'a shell on the shelf', 'a smell that brings back a day'],
        tip: 'Start a family memory jar: one happy moment written down each week.'
      },
      '10-12': {
        def: 'A moment from the past you keep in your mind — or an object that brings it back.',
        synonyms: ['a memory', 'a keepsake'],
        example: 'Malik\'s memory of the school trip gets funnier every time he tells it.',
        associations: ['a ticket stub kept', 'a song that brings back a summer', 'a story retold at dinner'],
        tip: 'Ask for their earliest memory — and tell them one of yours from that age.'
      },
      '13-16': {
        def: 'Something remembered from the past, kept in the mind or in an object.',
        synonyms: ['a memory', 'a keepsake'],
        example: 'Chloe realizes that the smallest memories sometimes last the longest.',
        associations: ['a photo pinned to the wall', 'a song tied to a summer', 'a place about to change'],
        tip: 'Ask what memory they would keep if they could save only one from this year.'
      }
    },
    {
      id: 'joyeux',
      kind: 'adj',
      word: 'joyful',
      '3-5': {
        def: 'Very happy, with big smiles and laughter.',
        synonyms: ['happy', 'cheerful'],
        example: 'Louise is joyful and dances when her favorite song plays.',
        associations: ['a laugh that fills the room', 'a dance in the kitchen', 'balloons'],
        tip: 'Put on a song and have a two-minute dance party right where you are.'
      },
      '6-9': {
        def: 'Very happy and full of good energy.',
        synonyms: ['happy', 'cheerful'],
        example: 'Noah is joyful all day after finding his lost cat.',
        associations: ['a song hummed on the way to school', 'a high five', 'a cake with sprinkles'],
        tip: 'Ask what makes their heart feel joyful — then put more of it in the week.'
      },
      '10-12': {
        def: 'Full of happiness and good energy.',
        synonyms: ['cheerful', 'merry'],
        example: 'The classroom feels joyful on the last day before the holidays.',
        associations: ['a holiday morning', 'a laugh you cannot hold in', 'a team that wins together'],
        tip: 'Start a small tradition that makes ordinary days joyful — pancakes on Fridays, music on Sundays.'
      },
      '13-16': {
        def: 'Full of real, warm happiness.',
        synonyms: ['cheerful', 'merry'],
        example: 'Emma\'s joyful energy makes even the group\'s boring study session feel fun.',
        associations: ['laughter around a table', 'a song everyone sings along to', 'good news shared at once'],
        tip: 'Ask what a joyful day looks like for them — not a big day, just a good one.'
      }
    },
    {
      id: 'remercier',
      kind: 'verb',
      word: 'to thank',
      '3-5': {
        def: 'Saying thank you when someone is kind to you.',
        synonyms: ['to say thank you', 'to show thanks'],
        example: 'Leo thanks the bus driver every morning.',
        associations: ['a wave and a smile', 'a drawing given as a thank-you', 'a thank-you said out loud'],
        tip: 'Count your thank-yous out loud today — see who can say five.'
      },
      '6-9': {
        def: 'To tell someone you are grateful for what they did.',
        synonyms: ['to say thank you', 'to show gratitude'],
        example: 'Emma thanks her coach with a card at the end of the season.',
        associations: ['a thank-you card', 'a wave to the bus driver', 'a hug that says it'],
        tip: 'Write one thank-you note this week — to a teacher, a friend, a neighbor.'
      },
      '10-12': {
        def: 'To tell someone you are grateful for what they have done.',
        synonyms: ['to show gratitude', 'to say thanks'],
        example: 'Malik thanks his grandfather for teaching him to fix bikes.',
        associations: ['a note left where it will be found', 'a thank-you said slowly, looking at the person', 'a favor returned'],
        tip: 'At dinner, each name one thing to thank the day for — small things count most.'
      },
      '13-16': {
        def: 'To express gratitude to someone, in words or in return.',
        synonyms: ['to show gratitude', 'to give thanks'],
        example: 'Louise thanks her old teacher in a letter, years after the class.',
        associations: ['a letter sent years later', 'gratitude said face to face', 'a favor paid forward'],
        tip: 'Ask who deserves a thank-you that never came — and help them send it.'
      }
    },
    {
      id: 'équilibre',
      kind: 'noun',
      word: 'balance',
      '3-5': {
        def: 'Standing steady without falling, like on one foot.',
        synonyms: ['steadiness', 'being steady'],
        example: 'Chloe keeps her balance when she walks along the low wall.',
        associations: ['a tightrope walker', 'one foot on a line', 'a scale that evens out'],
        tip: 'Walk a line on the floor together — arms out, slow steps, big concentration.'
      },
      '6-9': {
        def: 'Staying steady and not falling, or things being equal on both sides.',
        synonyms: ['steadiness', 'evenness'],
        example: 'Noah finds his balance on the new skateboard after a few tries.',
        associations: ['a seesaw that evens out', 'one foot held for ten seconds', 'a stack of blocks that stays up'],
        tip: 'Try a balance challenge together — who can stand on one leg the longest?'
      },
      '10-12': {
        def: 'The ability to stay steady; an even mix of different things.',
        synonyms: ['steadiness', 'an even mix'],
        example: 'Emma finds a good balance between school, swimming and drawing.',
        associations: ['a seesaw held level', 'time split between things', 'stones stacked by the river'],
        tip: 'Draw your week as a pie together: is there a slice for fun? For rest?'
      },
      '13-16': {
        def: 'A steady state where the different parts of life — work, rest, people — hold each other up.',
        synonyms: ['evenness', 'poise'],
        example: 'Malik looks for balance between screens, sports and sleep during exam season.',
        associations: ['stones stacked by a river', 'a schedule that breathes', 'a life of not just one thing'],
        tip: 'Ask which part of their week is missing balance — then move one thing, together.'
      }
    },
    {
      id: 'honnête',
      kind: 'adj',
      word: 'honest',
      '3-5': {
        def: 'Telling what is true, even when it is hard.',
        synonyms: ['truthful', 'sincere'],
        example: 'Noah is honest and says that he broke the cup.',
        associations: ['the truth said out loud', 'a broken cup owned up to', 'a straight answer'],
        tip: 'Say "thank you for telling me the truth" before anything else — it keeps honesty coming.'
      },
      '6-9': {
        def: 'Someone who tells the truth and does not cheat.',
        synonyms: ['truthful', 'sincere'],
        example: 'Emma is honest about her mistake and helps clean up the paint.',
        associations: ['a truth said with a deep breath', 'extra change given back', 'a game played fair'],
        tip: 'When they tell a hard truth, thank them for it first — your reaction teaches honesty.'
      },
      '10-12': {
        def: 'Telling the truth and playing fair, even when it costs you.',
        synonyms: ['truthful', 'sincere'],
        example: 'Malik is honest and admits he did not finish the reading before the discussion.',
        associations: ['change counted back exactly', 'a mistake admitted first', 'an opinion said kindly'],
        tip: 'Talk about when honesty is hard — and why it is still worth it.'
      },
      '13-16': {
        def: 'Being truthful and sincere, with others and with yourself.',
        synonyms: ['truthful', 'candid'],
        example: 'Chloe is honest with her friend about the plan, even though it was easier to agree.',
        associations: ['a mirror that does not flatter', 'a promise kept in the dark', 'a kind hard truth'],
        tip: 'Ask where being honest costs the most right now — and listen longer than feels natural.'
      }
    },
    {
      id: 'construire',
      kind: 'verb',
      word: 'to build',
      '3-5': {
        def: 'Making something by putting pieces together.',
        synonyms: ['to make', 'to put together'],
        example: 'Leo builds a tall tower with all his blocks.',
        associations: ['a block tower', 'a sandcastle', 'a blanket fort'],
        tip: 'Build something together today — a fort, a tower — and let them decide the plan.'
      },
      '6-9': {
        def: 'To make something by putting parts together, like a house or a tower.',
        synonyms: ['to make', 'to put together'],
        example: 'Emma and her dad build a birdhouse for the garden.',
        associations: ['a birdhouse with crooked nails', 'a brick wall rising', 'a card house that holds'],
        tip: 'Build something that lasts — a birdhouse, a bookshelf — and use it together.'
      },
      '10-12': {
        def: 'To make something by assembling parts — a model, a shelter, a big idea.',
        synonyms: ['to assemble', 'to construct'],
        example: 'Malik builds a model of the solar system for his science project.',
        associations: ['a model glued piece by piece', 'a treehouse drawn first', 'an idea built step by step'],
        tip: 'Ask what they would build if they had a whole free weekend and any materials.'
      },
      '13-16': {
        def: 'To put something together from parts — a structure, a plan, a future.',
        synonyms: ['to construct', 'to put up'],
        example: 'Noah builds his own computer from parts he saved up for.',
        associations: ['a floor plan on graph paper', 'a skill built practice by practice', 'a future planned brick by brick'],
        tip: 'Ask what they are building for their future right now, without noticing it.'
      }
    },
    {
      id: 'rêver',
      kind: 'verb',
      word: 'to dream',
      '3-5': {
        def: 'Seeing pictures and stories in your head while you sleep, or imagining nice things.',
        synonyms: ['to imagine', 'to make believe'],
        example: 'Chloe dreams of flying over the rooftops with her teddy bear.',
        associations: ['a cloud shaped like a horse', 'a dream told at breakfast', 'a wish whispered'],
        tip: 'Ask what they dreamed last night — or what they would like to dream tonight.'
      },
      '6-9': {
        def: 'To imagine things while you sleep, or to wish for something wonderful.',
        synonyms: ['to imagine', 'to wish'],
        example: 'Noah dreams of being an astronaut and draws his rocket in class.',
        associations: ['a wish made on a star', 'a rocket drawn in crayon', 'a dream told at breakfast'],
        tip: 'Write their big dream down somewhere visible — dreams change, and that is part of the fun.'
      },
      '10-12': {
        def: 'To imagine something you hope for, while awake or asleep.',
        synonyms: ['to imagine', 'to picture'],
        example: 'Louise dreams of opening a bakery and already tests recipes on Saturdays.',
        associations: ['a wish on a dandelion', 'a dream job described', 'a plan doodled in a notebook'],
        tip: 'Ask about their daydream — the one they never say out loud — with real interest.'
      },
      '13-16': {
        def: 'To picture the future you want, or to let your mind wander beyond what is here.',
        synonyms: ['to envision', 'to aspire'],
        example: 'Emma dreams of studying abroad and looks up programs on her own.',
        associations: ['a future mapped out at midnight', 'a dream that survives waking', 'a plan for someday'],
        tip: 'Ask which dream is "just a dream" and which one already has a first step.'
      }
    },
    {
      id: 'observer',
      kind: 'verb',
      word: 'to observe',
      '3-5': {
        def: 'Looking at something very carefully for a long time.',
        synonyms: ['to watch', 'to look closely'],
        example: 'Malik observes the ants carrying crumbs across the path.',
        associations: ['a magnifying glass', 'ants on a path', 'a bird on a wire'],
        tip: 'Pick one thing outside — a bug, a leaf — and watch it in silence for one minute.'
      },
      '6-9': {
        def: 'To look at something carefully to see how it works or what it does.',
        synonyms: ['to watch closely', 'to look carefully'],
        example: 'Emma observes the moon every night and draws its shape.',
        associations: ['a notebook of drawings', 'a bird watched from the window', 'a bug under a cup — with air holes'],
        tip: 'Start a small observation notebook: one thing noticed closely each day.'
      },
      '10-12': {
        def: 'To watch something closely and carefully, noticing its details.',
        synonyms: ['to watch closely', 'to take in'],
        example: 'Chloe observes how her cat asks for food and writes down its three signals.',
        associations: ['a bird identified by its song', 'a detail nobody else noticed', 'a scientist\'s notebook'],
        tip: 'Play "spot the detail": describe a familiar room from memory, then check what you missed.'
      },
      '13-16': {
        def: 'To watch with attention and without judging — to really see what is there.',
        synonyms: ['to watch closely', 'to take in'],
        example: 'Noah observes the argument from the outside and understands both sides.',
        associations: ['a detail that changes the story', 'a habit noticed in yourself', 'a skyline watched from a roof'],
        tip: 'Ask what they have observed about people lately — teens often see more than they say.'
      }
    },
    {
      id: 'patienter',
      kind: 'verb',
      word: 'to wait',
      '3-5': {
        def: 'Waiting calmly without complaining.',
        synonyms: ['to hold on', 'to bide your time'],
        example: 'Louise waits for her turn on the swing without fussing.',
        associations: ['a timer counting down', 'a line at the store', 'a seed in the ground'],
        tip: 'Make waiting a game: guess how long one minute is, then check the clock.'
      },
      '6-9': {
        def: 'To stay calm while you wait for your turn or for something to happen.',
        synonyms: ['to hold on', 'to bide your time'],
        example: 'Noah waits patiently for the bread to rise all afternoon.',
        associations: ['a seed underground', 'a countdown to a birthday', 'a line that finally moves'],
        tip: 'Plant something slow — a seed, a bulb — and practice waiting for it together.'
      },
      '10-12': {
        def: 'To wait calmly, without rushing or complaining.',
        synonyms: ['to hold on', 'to bide one\'s time'],
        example: 'Emma waits for the results of the contest with her fingers crossed.',
        associations: ['a pot that takes weeks to sprout', 'a line to the front', 'a countdown on the calendar'],
        tip: 'Ask what is worth waiting for right now — and what makes the waiting easier.'
      },
      '13-16': {
        def: 'To wait calmly for something that takes time — a result, an answer, a change.',
        synonyms: ['to bide one\'s time', 'to hold on'],
        example: 'Malik waits for his exam results and keeps busy with his music.',
        associations: ['an answer that will not come faster', 'a season of practice before results', 'a slow sunrise'],
        tip: 'Talk about the hardest wait you ever lived through — and what got you through it.'
      }
    },
    {
      id: 'explorer',
      kind: 'verb',
      word: 'to explore',
      '3-5': {
        def: 'Going to see new places and finding out what is there.',
        synonyms: ['to look around', 'to discover'],
        example: 'Chloe explores the garden and finds a secret path.',
        associations: ['a magnifying glass', 'a backyard turned jungle', 'a map with an X'],
        tip: 'Explore one room as if you were the first people ever to see it.'
      },
      '6-9': {
        def: 'To travel around a place to learn what is there.',
        synonyms: ['to look around', 'to venture into'],
        example: 'Emma and Malik explore the forest behind the school and follow the stream.',
        associations: ['a path never taken', 'a map drawn as you go', 'a flashlight in a closet'],
        tip: 'Take a different way home and name five new things you see.'
      },
      '10-12': {
        def: 'To travel through a place to learn about it, or to try something new.',
        synonyms: ['to venture into', 'to look around'],
        example: 'Louise explores the old town with a paper map and no phone.',
        associations: ['a map with blank corners', 'a new neighborhood on foot', 'a question followed to its end'],
        tip: 'Explore somewhere familiar like a tourist — museum, market, new route — and report back.'
      },
      '13-16': {
        def: 'To go into the unknown — a place, a subject, a way of thinking.',
        synonyms: ['to venture into', 'to range through'],
        example: 'Noah explores philosophy podcasts on his runs, one big question at a time.',
        associations: ['a map with the edges still blank', 'a first solo trip', 'a field of study wandered into'],
        tip: 'Ask what they would like to explore with no grade attached — and help them start.'
      }
    },
    {
      id: 'tenace',
      kind: 'adj',
      word: 'determined',
      '3-5': {
        def: 'Not giving up, even when it is hard.',
        synonyms: ['not giving up', 'strong-willed'],
        example: 'Leo is determined and tries the puzzle again and again until it is done.',
        associations: ['a puzzle finished on try ten', 'small feet climbing again', 'a knot untied slowly'],
        tip: 'Say their persistence out loud: "You did not give up — look what that did."'
      },
      '6-9': {
        def: 'Someone who keeps going and never gives up easily.',
        synonyms: ['persistent', 'strong-willed'],
        example: 'Emma is determined and practices the hard song every single day.',
        associations: ['a bike learned on day five', 'a kite that flies on try four', 'a level finally passed'],
        tip: 'Praise the keeping-going, not just the winning: "You stuck with it."'
      },
      '10-12': {
        def: 'Refusing to give up, even when things get long or difficult.',
        synonyms: ['persistent', 'resolute'],
        example: 'Malik is determined to finish the big race, even after falling once.',
        associations: ['a race finished after a fall', 'a Rubik\'s cube finally solved', 'a subject practiced until it clicks'],
        tip: 'Ask what they kept working at longest this year — and what kept them going.'
      },
      '13-16': {
        def: 'Holding onto a goal and working at it steadily, whatever gets in the way.',
        synonyms: ['persistent', 'resolute'],
        example: 'Chloe stays determined through the whole application season, one form at a time.',
        associations: ['a long road walked in steps', 'a craft practiced for years', 'a goal that survives a bad week'],
        tip: 'Ask what goal is worth being stubborn about — and tell them what you are stubborn about too.'
      }
    }
  ];

  const api = { words };
  global.PAPOTE_WORDS_EN = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);