# Game Boy Text Tools

## Running

* Clone this project
* Make sure you have NodeJS >= 9.1.0

### Relative Search

It'll search through the ROM looking for the relative distance between the bytes' characters.

**Don't mix upper and lower case characters. Choose a case and keep it for each search**

`node relativeSearch.js path-to-rom 'what you are searching'`

Output:
```
Found!
hexSentence: C7 BE C6 C2 BE CC
Byte for a: BA
```

### Translator

Once you know the byte representation of lower and upper case 'a' (first letter of the alphabet in the sequential table) you can pass it to the translator function:

`node translator.js 'Your sentence here' lowerCaseAByte upperCaseAByte`

* lowerCaseAByte - 0x80
* upperCaseAByte - 0xA0

*Values above for using with Pokemon Red, change it accordingly to the game*

Output:
```
A7 8E 89 84 EF 8E EF 83 88 80 EF 85 8E 88 EF 8B 8E 94 82 8E
```