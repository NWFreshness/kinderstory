// Kindergarten sight words from user
const sightWords = [
  "first", "with", "they", "three", "where", "day", "could", "six", "look", "as",
  "he", "said", "there", "him", "that", "got", "not", "too", "why", "new",
  "i", "can", "we", "the", "at", "am", "it", "up", "no", "yes",
  "like", "a", "see", "go", "in", "of", "us"
];

// Additional simple words appropriate for kindergarteners
const simpleWords = [
  // Articles, pronouns, prepositions
  "an", "is", "are", "was", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "could", "should", "may", "might", "must",
  "shall", "ought", "used", "get", "gets", "got", "getting",
  "this", "these", "those", "my", "your", "his", "her", "its", "our", "their",
  "me", "us", "them", "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves",
  "by", "from", "about", "into", "through", "during", "before", "after", "above", "below",
  "to", "from", "at", "on", "in", "out", "over", "under", "again", "once",
  "here", "there", "when", "what", "which", "who", "whom", "whose", "why", "how",
  "all", "each", "every", "both", "few", "more", "most", "other", "some", "such",
  "and", "but", "or", "nor", "so", "yet", "for", "because", "although", "while",
  "if", "then", "else", "when", "unless", "until", "while", "ever",
  "now", "then", "today", "tomorrow", "yesterday", "soon", "later", "early",
  "just", "also", "only", "even", "still", "already", "always", "never", "sometimes", "often",
  "very", "really", "quite", "too", "enough", "almost", "nearly",

  // Simple verbs
  "run", "runs", "ran", "running",
  "walk", "walks", "walked", "walking",
  "jump", "jumps", "jumped", "jumping",
  "play", "plays", "played", "playing",
  "eat", "eats", "ate", "eating",
  "sleep", "sleeps", "slept", "sleeping",
  "sit", "sits", "sat", "sitting",
  "stand", "stands", "stood", "standing",
  "swim", "swims", "swam", "swimming",
  "fly", "flies", "flew", "flying",
  "sing", "sings", "sang", "singing",
  "dance", "dances", "danced", "dancing",
  "read", "reads", "reading",
  "write", "writes", "writing",
  "draw", "draws", "drawing",
  "paint", "paints", "painted", "painting",
  "build", "builds", "built", "building",
  "make", "makes", "made", "making",
  "help", "helps", "helped", "helping",
  "share", "shares", "shared", "sharing",
  "say", "says", "said",
  "ask", "asks", "asked", "asking",
  "come", "comes", "came", "coming",
  "go", "goes", "went", "going",
  "take", "takes", "took", "taking",
  "give", "gives", "gave", "giving",
  "show", "shows", "showed", "showing",
  "try", "tries", "tried", "trying",
  "look", "looks", "looked", "looking",
  "want", "wants", "wanted", "wanting",
  "need", "needs", "needed", "needing",
  "use", "uses", "used", "using",
  "find", "finds", "found", "finding",
  "think", "thinks", "thought", "thinking",
  "feel", "feels", "felt", "feeling",
  "grow", "grows", "grew", "growing",
  "open", "opens", "opened", "opening",
  "close", "closes", "closed", "closing",
  "start", "starts", "started", "starting",
  "stop", "stops", "stopped", "stopping",
  "keep", "keeps", "kept", "keeping",
  "hold", "holds", "held", "holding",
  "turn", "turns", "turned", "turning",
  "call", "calls", "called", "calling",
  "hear", "hears", "heard", "hearing",
  "see", "sees", "saw", "seeing",
  "watch", "watches", "watched", "watching",
  "live", "lives", "lived", "living",
  "laugh", "laughs", "laughed", "laughing",
  "smile", "smiles", "smiled", "smiling",
  "cry", "cries", "cried", "crying",

  // Simple nouns - animals
  "dog", "puppy", "cat", "kitten", "bird", "fish", "frog", "duck", "rabbit", "bunny",
  "bear", "lion", "tiger", "elephant", "monkey", "horse", "cow", "pig", "sheep", "chicken",
  "mouse", "snake", "turtle", "butterfly", "bee", "ant", "spider", "ladybug", "dragonfly",
  "pet", "pets", "zoo", "farm", "animal", "animals",

  // Simple nouns - people/family
  "mom", "dad", "mama", "papa", "baby", "brother", "sister", "grandma", "grandpa", "family",
  "friend", "friends", "teacher", "boy", "girl", "boys", "girls", "child", "children",
  "man", "woman", "people", "name", "names",

  // Simple nouns - objects/things
  "ball", "toy", "toys", "book", "books", "car", "cars", "train", " trains", "bus",
  "bike", "tree", "trees", "flower", "flowers", "grass", "sun", "moon", "star", "stars",
  "sky", "cloud", "clouds", "rain", "snow", "wind", "water", "river", "lake",
  "house", "home", "door", "window", "chair", "table", "bed", "food", "apple", "apples",
  "orange", "banana", "milk", "cookie", "cake", "ice cream", "bread", "juice",
  "hat", "hat", "shoe", "shoes", "shirt", "coat", "bag", "box", "cup", "plate",
  "pencil", "paper", "crayon", "crayons", "color", "colors", "picture", "game", "games",
  "hand", "hands", "foot", "feet", "eye", "eyes", "ear", "ears", "nose", "mouth",
  "heart", "day", "night", "morning", "time", "clock",

  // Simple adjectives
  "big", "small", "little", "tiny", "huge", "large",
  "happy", "sad", "mad", "glad", "good", "bad",
  "hot", "cold", "warm", "cool",
  "fast", "slow", "quick", "quickly",
  "high", "low", "long", "short",
  "new", "old", "young",
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white",
  "bright", "dark", "light",
  "wet", "dry", "clean", "dirty",
  "loud", "quiet", "soft",
  "nice", "kind", "mean", "fun", "silly", "funny",
  "pretty", "beautiful", "ugly", "cute",
  "full", "empty", "hungry", "thirsty",
  "sleepy", "tired", " awake", "sick", "well",
  "safe", "dangerous", "scary", "brave",
  "rich", "poor", "fair", "best", "worst",

  // Simple adverbs
  "very", "really", "so", "too", "quite", "pretty", "almost", "just", "still", "even",
  "here", "there", "now", "then", "today", "tomorrow", "yesterday",
  "yes", "no", "not", "maybe", "ok", "okay",

  // Places
  "home", "school", "park", "store", "beach", "pool", "bed", "room",
  "car", "bus", "tree", "hill", "road", "garden", "yard",

  // Common phrases/expressions
  "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "hello", "hi", "bye", "goodbye", "please", "thank", "thanks", "sorry",
  "wow", "oh", "wow", "yum", "yuck", "oops", "wow", "yea", "yeah", "nope",
  "uh huh", "nope", "okay", "alright", "sure"
];

// Combine all words into one vocabulary set
const allWords = new Set([
  ...sightWords.map(w => w.toLowerCase()),
  ...simpleWords.map(w => w.toLowerCase())
]);

// Helper to check if a word is in our vocabulary
export function isAllowedWord(word: string): boolean {
  const cleaned = word.toLowerCase().replace(/[^a-z']/g, '');
  return allWords.has(cleaned);
}

// Get all allowed words as an array
export function getAllowedVocabulary(): string[] {
  return Array.from(allWords).sort();
}

// Random concept seeds for story generation
export const storySeeds = [
  "a friendly dog at the park",
  "a cat and a mouse",
  "a bear in the woods",
  "a fish in the ocean",
  "a bird learning to fly",
  "a butterfly in the garden",
  "a frog on a lily pad",
  "a bunny in the forest",
  "a monkey swinging in trees",
  "a horse on a farm",
  "a lion at the zoo",
  "a turtle and a rabbit racing",
  "a duck and her ducklings",
  "a bee and a flower",
  "a spider building a web",
  "a ladybug on a leaf",
  "children playing at recess",
  "a puppy at the pet store",
  "a kitten by the window",
  "a bear and her cubs",
  "an elephant at the water hole",
  "a rainbow after the rain",
  "the sun and the moon",
  "stars in the night sky",
  "clouds shaped like animals",
  "a tree in all four seasons",
  "a flower growing in the garden",
  "a cookie baking in the oven",
  "an apple on a tree",
  "a train on the tracks",
  "a boat sailing on the water",
  "a kite flying in the sky",
  "a ball bouncing in the yard",
  "a bike riding down the road",
  "a book being read at bedtime",
  "a teddy bear going to sleep",
  "a snowman in winter",
  "a sandcastle at the beach",
  "a frog catching a fly",
  "a squirrel hiding acorns",
  "a goose flying south",
  "a cow in the pasture",
  "a pig rolling in mud",
  "a sheep in the meadow",
  "a rooster on the fence",
  "a cat chasing a butterfly"
];

export const sightWordList = sightWords;
