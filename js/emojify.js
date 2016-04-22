(function (root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.emojify = factory();
    }
}(this, function () {
        'use strict';

        var emojify = (function () {
            var namedEmojiString = ""
            var namedEmoji = namedEmojiString.split(/,/);
            var namedMatchHash = namedEmoji.reduce(function(memo, v) {
                memo[v] = true;
                return memo;
            }, {});

            var emoticonsProcessed;
            var emojiMegaRe;

            function initEmoticonsProcessed() {
                var emoticons = {
                
                     /* :..: */ named: /:([a-z0-9A-Z_-]+):/,

                     // Emojis Pessoas e sorrisos

                     /* \ud83d\ude00 */ grinning: /\\ud83d\\ude00/,
                     /* \ud83d\ude04 */ smile: /\\ud83d\\ude04/,
                     /* \ud83d\ude0a */ blush: /\\ud83d\\ude0a/,
                     /* \ud83d\ude0c */ relieved: /\\ud83d\\ude0c/,
                     /* \ud83d\ude1a */ kissing_face: /\\ud83d\\ude1a/,
                     /* \ud83e\udd13 */ esse_nao_tem_imagem: /\\ud83e\\udd13/,
                     /* \ud83d\ude10 */ neutral_face: /\\ud83d\\ude10/,
                     /* \ud83d\ude33 */ flushed: /\\ud83d\\ude33/,
                     /* \ud83d\ude14 */ pensive: /\\ud83d\\ude14/,
                     /* \ud83d\ude16 */ confounded: /\\ud83d\\ude16/,
                     /* \ud83d\ude31 */ scream: /\\ud83d\\ude31/,
                     /* \ud83d\ude27 */ anguished: /\\ud83d\\ude27/,
                     /* \ud83d\ude2d */ sob: /\\ud83d\\ude2d/,
                     /* \ud83e\udd12 */ esse_nao_tem_imagem1: /\\ud83e\\udd12/,
                     /* \ud83d\ude08 */ smiling_imp: /\\ud83d\\ude08/,
                     /* \ud83d\udc7b */ ghost: /\\ud83d\\udc7b/,
                     /* \ud83d\ude39 */ joy_cat: /\\ud83d\\ude39/,
                     /* \ud83d\ude3f */ crying_cat_face: /\\ud83d\\ude3f/,
                     /* \ud83d\ude0d */ heart_eyes: /\\ud83d\\ude0d/,
                     /* \ud83d\ude2c */ grimacing: /\\ud83d\\ude2c/,
                     /* \ud83d\ude05 */ sweat_smile: /\\ud83d\\ude05/,
                     /* \ud83d\ude42 */ esse_nao_tem_imagem2: /\\ud83d\\ude42/,
                     /* \ud83d\ude1c */ stuck_out_tongue_winking_eye: /\\ud83d\\ude1c/,
                     /* \ud83d\ude0e */ sunglasses: /\\ud83d\\ude0e/,
                     /* \ud83d\ude11 */ expressionless: /\\ud83d\\ude11/,
                     /* \ud83d\ude1e */ disappointed: /\\ud83d\\ude1e/,
                     /* \ud83d\ude15 */ confused: /\\ud83d\\ude15/,
                     /* \ud83d\ude2b */ tired_face1: /\\ud83d\\ude2b/,
                     /* \ud83d\ude28 */ fearful: /\\ud83d\\ude28/,
                     /* \ud83d\ude22 */ disappointed_relieved: /\\ud83d\\ude22/,
                     /* \ud83d\ude35 */ dizzy_face: /\\ud83d\\ude35/,
                     /* \ud83e\udd15 */ esse_nao_tem_imagem3: /\\ud83e\\udd15/,
                     /* \ud83d\udc7f */ imp: /\\ud83d\\udc7f/,
                     /* \ud83d\udc7d */ alien: /\\ud83d\\udc7d/,
                     /* \ud83d\ude3b */ heart_eyes_cat: /\\ud83d\\ude3b/,
                     /* \ud83d\ude3e */ pouting_cat: /\\ud83d\\ude3e/,
                     /* \ud83d\ude01 */ grin: /\\ud83d\\ude01/,
                     /* \ud83d\ude06 */ satisfied: /\\ud83d\\ude06/,
                     /* \ud83d\ude43 */ esse_nao_tem_imagem4: /\\ud83d\\ude43/,
                     /* \ud83d\ude18 */ kissing_heart: /\\ud83d\\ude18/,
                     /* \ud83d\ude1d */ stuck_out_tongue_closed_eyes: /\\ud83d\\ude1d/,
                     /* \ud83e\udd17 */ esse_nao_tem_imagem5: /\\ud83e\\udd17/,
                     /* \ud83d\ude12 */ unamused: /\\ud83d\\ude12/,
                     /* \ud83d\ude1f */ worried: /\\ud83d\\ude1f/,
                     /* \ud83d\ude41 */ esse_nao_tem_imagem6: /\\ud83d\\ude41/,
                     /* \ud83d\ude29 */ weary: /\\ud83d\\ude29/,
                     /* \ud83d\ude30 */ cold_sweat: /\\ud83d\\ude30/,
                     /* \ud83d\ude25 */ cry: /\\ud83d\\ude25/,
                     /* \ud83d\ude32 */ astonished: /\\ud83d\\ude32/,
                     /* \ud83d\ude34 */ sleeping: /\\ud83d\\ude34/,
                     /* \ud83d\udc79 */ japanese_ogre: /\\ud83d\\udc79/,
                     /* \ud83e\udd16 */ esse_nao_tem_imagem7: /\\ud83e\\udd16/,
                     /* \ud83d\ude4c */ raised_hands: /\\ud83d\\ude4c/,
                    /* \ud83d\ude02 */  joy: /\\ud83d\\ude02/, 
                    /* \ud83d\ude07 */  innocent: /\\ud83d\\ude07/, 
                    /* \u263a\ufe0f */  relaxed: /\\u263a\\ufe0f/, 
                    /* \ud83d\ude17 */ kissing: /\\ud83d\\ude17/, 
                    /* \ud83d\ude1b */ stuck_out_tongue: /\\ud83d\\ude1b/, 
                    /* \ud83d\ude0f */ smirk: /\\ud83d\\ude0f/, 
                    /* \ud83d\ude44 */ esse_nao_tem_imagem8: /\\ud83d\\ude44/, 
                    /* \ud83d\ude20 */ angry: /\\ud83d\\ude20/, 
                    /* \ud83d\ude20 */ esse_nao_tem_imagem9: /\\ud83d\\ude20/, 
                    /* \ud83d\ude24 */ triumph: /\\ud83d\\ude24/, 
                    /* \ud83d\ude2f */ hushed: /\\ud83d\\ude2f/, 
                    /* \ud83d\ude2a */ sleepy: /\\ud83d\\ude2a/,
                    /* \ud83e\udd10 */ esse_nao_tem_imagem11: /\\ud83e\\udd10/, 
                    /* \ud83d\udca4 */ zzz: /\\ud83d\\udca4/, 
                    /* \ud83d\udc7a */ japanese_goblin: /\\ud83d\\udc7a/,   
                    /* \ud83d\ude3a */ smiley_cat: /\\ud83d\\ude3a/, 
                    /* \ud83d\ude3d */ kissing_cat: /\\ud83d\\ude3d/, 
                    /* \ud83d\udc4f */ clap: /\\ud83d\\udc4f/,

                    /* \ud83d\ude03 */ smiley: /\\ud83d\\ude03/,
                    /* \ud83d\ude09 */ wink: /\\ud83d\\ude09/, 
                    /* \ud83d\ude0b */ yum: /\\ud83d\\ude0b/, 
                    /* \ud83d\ude19 */ kissing_smiling_eyes: /\\ud83d\\ude19/, 
                    /* \ud83e\udd11 */ esse_nao_tem_imagem12: /\\ud83e\\udd11/, 
                    /* \ud83d\ude36 */ no_mouth: /\\ud83d\\ude36/, 
                    /* \ud83e\udd14 */ esse_nao_tem_imagem13: /\\ud83e\\udd14/, 
                    /* \ud83d\ude21 */ rage: /\\ud83d\\ude21/, 
                    /* \ud83d\ude23 */ persevere: /\\ud83d\\ude23/, 
                    /* \ud83d\ude2e */ open_mouth: /\\ud83d\\ude2e/, 
                    /* \ud83d\ude26 */ frowning: /\\ud83d\\ude26/, 
                    /* \ud83d\ude13 */ sweat: /\\ud83d\\ude13/, 
                    /* \ud83d\ude37 */ mask: /\\ud83d\\ude37/, 
                    /* \ud83d\udca9 */ esse_nao_tem_imagem14: /\\ud83d\\udca9/, 
                    /* \ud83d\udc80 */ hankey: /\\ud83d\\udc80/, 
                    /* \ud83d\ude38 */ smile_cat: /\\ud83d\\ude38/, 
                    /* \ud83d\ude40 */ scream_cat: /\\ud83d\\ude40/,
                    /* \ud83d\udc4b */ wave: /\\ud83d\\udc4b/,
                    /* \ud83d\udc4d */ legal: /\\ud83d\\udc4d/,
                    /* \ud83d\udc4e */ nao_legal: /\\ud83d\\udc4e/,
                    /* \ud83d\udc4a */ facepunch: /\\ud83d\\udc4a/,
                    /* \u270a */       fist: /\\u270a/,
                    /* \u270c\ufe0f */ v: /\\u270c\\ufe0f/,
                    /* \ud83d\udc4c */ ok_hand: /\\ud83d\\udc4c/,
                    /* \u270b */       raised_hand: /\\u270b/,
                    /* \ud83d\udc50 */ open_hands: /\\ud83d\\udc50/,
                    /* \ud83d\udcaa */ muscle: /\\ud83d\\udcaa/,
                    /* \ud83d\ude4f */ pray: /\\ud83d\\ude4f/,
                    /* \u261d\ufe0f */ point_up: /\\u261d\\ufe0f/,
                    /* \ud83d\udc46 */ point_up_2: /\\ud83d\\udc46/,
                    /* \ud83d\udc47 */ point_down: /\\ud83d\\udc47/,
                    /* \ud83d\udc48 */ point_left: /\\ud83d\\udc48/,
                    /* \ud83d\udc49 */ point_right: /\\ud83d\\udc49/,
                    /* \ud83d\udd95 */ fu: /\\ud83d\\udd95/,
                    /* \ud83d\udd90 */ esse_nao_tem_imagem15: /\\ud83d\\udd90/,
                    /* \ud83e\udd18 */ metal: /\\ud83e\\udd18/,
                    /* \ud83d\udd96 */ esse_nao_tem_imagem16: /\\ud83d\\udd96/,
                    /* \u270d */       esse_nao_tem_imagem17: /\\u270d/,
                    /* \ud83d\udc85 */ nail_care: /\\ud83d\\udc85/,
                    /* \ud83d\udc44 */ lips: /\\ud83d\\udc44/,
                    /* \ud83d\udc45 */ tongue: /\\ud83d\\udc45/,
                    /* \ud83d\udc42 */ ear: /\\ud83d\\udc42/,
                    /* \ud83d\udc43 */ nose: /\\ud83d\\udc43/,
                    /* \ud83d\udc41 */ esse_nao_tem_imagem18: /\\ud83d\\udc41/,
                    /* \ud83d\udc40 */ eyes: /\\ud83d\\udc40/,
                    /* \ud83d\udc64 */ bust_in_silhouette: /\\ud83d\\udc64/,
                    /* \ud83d\udc65 */ busts_in_silhouette2: /\\ud83d\\udc65/,
                    /* \ud83d\udde3 */ esse_nao_tem_imagem19: /\\ud83d\\udde3/,
                    /* \ud83d\udc76 */ baby: /\\ud83d\\udc76/,
                    /* \ud83d\udc66 */ person_with_blond_hair: /\\ud83d\\udc66/,
                    /* \ud83d\udc67 */ girl: /\\ud83d\\udc67/,
                    /* \ud83d\udc68 */ man: /\\ud83d\\udc68/,
                    /* \ud83d\udc69 */ woman: /\\ud83d\\udc69/,
                    /* \ud83d\udc71 */ boy: /\\ud83d\\udc71/,
                    /* \ud83d\udc74 */ older_man: /\\ud83d\\udc74/,
                    /* \ud83d\udc75 */ older_woman: /\\ud83d\\udc75/,
                    /* \ud83d\udc72 */ man_with_gua_pi_mao: /\\ud83d\\udc72/,
                    /* \ud83d\udc73 */ man_with_turban: /\\ud83d\\udc73/,
                    /* \ud83d\udc6e */ cop: /\\ud83d\\udc6e/,
                    /* \ud83d\udc77 */ construction_worker: /\\ud83d\\udc77/,
                    /* \ud83d\udc82 */ guardsman: /\\ud83d\\udc82/,
                    /* \ud83d\udd75 */ esse_nao_tem_imagem20: /\\ud83d\\udd75/,
                    /* \ud83c\udf85 */ santa: /\\ud83c\\udf85/,
                    /* \ud83d\udc7c */ angel: /\\ud83d\\udc7c/,
                    /* \ud83d\udc78 */ princess: /\\ud83d\\udc78/,
                    /* \ud83d\udc70 */ bride_with_veil: /\\ud83d\\udc70/,
                    /* \ud83d\udeb6 */ walking: /\\ud83d\\udeb6/,
                    /* \ud83c\udfc3 */ running: /\\ud83c\\udfc3/,
                    /* \ud83d\udc83 */ dancer: /\\ud83d\\udc83/,
                    /* \ud83d\udc6f */ dancers: /\\ud83d\\udc6f/,
                    /* \ud83d\udc6b */ couple: /\\ud83d\\udc6b/,
                    /* \ud83d\udc6c */ two_men_holding_hands: /\\ud83d\\udc6c/,
                    /* \ud83d\udc6d */ two_women_holding_hands: /\\ud83d\\udc6d/,
                    /* \ud83d\ude47 */ bow: /\\ud83d\\ude47/,
                    /* \ud83d\udc81 */ information_desk_person: /\\ud83d\\udc81/,
                    /* \ud83d\ude45 */ no_good: /\\ud83d\\ude45/,
                    /* \ud83d\ude46 */ ok_woman: /\\ud83d\\ude46/,
                    /* \ud83d\ude4b */ raising_hand: /\\ud83d\\ude4b/,
                    /* \ud83d\ude4e */ person_with_pouting_face: /\\ud83d\\ude4e/,
                    /* \ud83d\ude4d */ person_frowning: /\\ud83d\\ude4d/,
                    /* \ud83d\udc87 */ haircut: /\\ud83d\\udc87/,
                    /* \ud83d\udc86 */ massage: /\\ud83d\\udc86/,
                    /* \ud83d\udc91 */ couple_with_heart: /\\ud83d\\udc91/,
                    /* \ud83d\udc8f */ couplekiss: /\\ud83d\\udc8f/,
                    /* \u200d\u2764 */ family: /\\u200d\\u2764/,
                    /* \ud83d\udc6a */ womans_clothes: /\\ud83d\\udc6a/,
                    /* \ud83d\udc55 */ shirt: /\\ud83d\\udc55/,
                    /* \ud83d\udc56 */ jeans: /\\ud83d\\udc56/,
                    /* \ud83d\udc54 */ esse_nao_tem_imagem21: /\\ud83d\\udc54/,
                    /* \ud83d\udc57 */ dress: /\\ud83d\\udc57/,
                    /* \ud83d\udc59 */ bikini: /\\ud83d\\udc59/,
                    /* \ud83d\udc58 */ kimono: /\\ud83d\\udc58/,
                    /* \ud83d\udc84 */ lipstick: /\\ud83d\\udc84/,
                    /* \ud83d\udc8b */ kiss: /\\ud83d\\udc8b/,
                    /* \ud83d\udc63 */ feet: /\\ud83d\\udc63/,
                    /* \ud83d\udc60 */ high_heel: /\\ud83d\\udc60/,
                    /* \ud83d\udc61 */ sandal: /\\ud83d\\udc61/,
                    /* \ud83d\udc62 */ boot: /\\ud83d\\udc62/,
                    /* \ud83d\udc5e */ mans_shoe: /\\ud83d\\udc5e/,
                    /* \ud83d\udc5f */ shoe: /\\ud83d\\udc5f/,
                    /* \ud83d\udc52 */ womans_hat: /\\ud83d\\udc52/,
                    /* \ud83c\udfa9 */ tophat: /\\ud83c\\udfa9/,
                    /* \ud83c\udf93 */ mortar_board: /\\ud83c\\udf93/,
                    /* \ud83d\udc51 */ crown: /\\ud83d\\udc51/,
                    /* \u26d1 */       esse_nao_tem_imagem22: /\\u26d1/,
                    /* \ud83c\udf92 */ school_satchel: /\\ud83c\\udf92/,
                    /* \ud83d\udc5d */ pouch: /\\ud83d\\udc5d/,
                    /* \ud83d\udc5b */ purse: /\\ud83d\\udc5b/,
                    /* \ud83d\udc5c */ handbag: /\\ud83d\\udc5c/,
                    /* \ud83d\udcbc */ briefcase: /\\ud83d\\udcbc/,
                    /* \ud83d\udc53 */ eyeglasses: /\\ud83d\\udc53/,
                    /* \ud83d\udd76 */ esse_nao_tem_imagem23: /\\ud83d\\udd76/,
                    /* \ud83d\udc8d */ ring: /\\ud83d\\udc8d/,
                    /* \ud83c\udf02 */ closed_umbrella: /\\ud83c\\udf02/,

                    // Emojis Animais e Natureza

                    /* \ud83d\udc36 */ dog: /\\ud83d\\udc36/,
                    /* \ud83d\udc31 */ cat: /\\ud83d\\udc31/,
                    /* \ud83d\udc2d */ mouse: /\\ud83d\\udc2d/,
                    /* \ud83d\udc39 */ hamster: /\\ud83d\\udc39/,
                    /* \ud83d\udc30 */ rabbit: /\\ud83d\\udc30/,
                    /* \ud83d\udc3b */ bear: /\\ud83d\\udc3b/,
                    /* \ud83d\udc3c */ panda_face: /\\ud83d\\udc3c/,
                    /* \ud83d\udc28 */ koala: /\\ud83d\\udc28/,
                    /* \ud83d\udc2f */ tiger: /\\ud83d\\udc2f/,
                    /* \ud83e\udd81 */ esse_nao_tem_imagem24: /\\ud83e\\udd81/,
                    /* \ud83d\udc2e */ cow: /\\ud83d\\udc2e/,
                    /* \ud83d\udc37 */ pig: /\\ud83d\\udc37/,
                    /* \ud83d\udc3d */ pig_nose: /\\ud83d\\udc3d/,
                    /* \ud83d\udc38 */ frog: /\\ud83d\\udc38/,
                    /* \ud83d\udc19 */ octopus: /\\ud83d\\udc19/,
                    /* \ud83d\udc35 */ monkey_face: /\\ud83d\\udc35/,
                    /* \ud83d\ude48 */ see_no_evil: /\\ud83d\\ude48/,
                    /* \ud83d\ude49 */ hear_no_evil: /\\ud83d\\ude49/,
                    /* \ud83d\ude4a */ speak_no_evil: /\\ud83d\\ude4a/,
                    /* \ud83d\udc12 */ monkey: /\\ud83d\\udc12/,
                    /* \ud83d\udc14 */ chicken: /\\ud83d\\udc14/,
                    /* \ud83d\udc27 */ penguin: /\\ud83d\\udc27/,
                    /* \ud83d\udc26 */ bird: /\\ud83d\\udc26/,
                    /* \ud83d\udc24 */ baby_chick: /\\ud83d\\udc24/,
                    /* \ud83d\udc23 */ hatching_chick: /\\ud83d\\udc23/,
                    /* \ud83d\udc25 */ hatched_chick: /\\ud83d\\udc25/,
                    /* \ud83d\udc3a */ wolf: /\\ud83d\\udc3a/,
                    /* \ud83d\udc17 */ boar: /\\ud83d\\udc17/,
                    /* \ud83d\udc34 */ horse: /\\ud83d\\udc34/,
                    /* \ud83e\udd84 */ esse_nao_tem_imagem25: /\\ud83e\\udd84/,
                    /* \ud83d\udc1d */ bee: /\\ud83d\\udc1d/,
                    /* \ud83d\udc1b */ bug: /\\ud83d\\udc1b/,
                    /* \ud83d\udc0c */ snail: /\\ud83d\\udc0c/,
                    /* \ud83d\udc1e */ beetle: /\\ud83d\\udc1e/,
                    /* \ud83d\udc1c */ ant: /\\ud83d\\udc1c/,
                    /* \ud83d\udd77 */ esse_nao_tem_imagem26: /\\ud83d\\udd77/,
                    /* \ud83e\udd82 */ esse_nao_tem_imagem27: /\\ud83e\\udd82/,
                    /* \ud83e\udd80 */ esse_nao_tem_imagem28: /\\ud83e\\udd80/,
                    /* \ud83d\udc0d */ snake: /\\ud83d\\udc0d/,
                    /* \ud83d\udc22 */ turtle: /\\ud83d\\udc22/,
                    /* \ud83d\udc20 */ tropical_fish: /\\ud83d\\udc20/,
                    /* \ud83d\udc1f */ fish: /\\ud83d\\udc1f/,
                    /* \ud83d\udc21 */ blowfish: /\\ud83d\\udc21/,
                    /* \ud83d\udc2c */ dolphin: /\\ud83d\\udc2c/,
                    /* \ud83d\udc33 */ whale: /\\ud83d\\udc33/,
                    /* \ud83d\udc0b */ whale2: /\\ud83d\\udc0b/,
                    /* \ud83d\udc0a */ crocodile: /\\ud83d\\udc0a/,
                    /* \ud83d\udc06 */ leopard: /\\ud83d\\udc06/,
                    /* \ud83d\udc05 */ tiger2: /\\ud83d\\udc05/,
                    /* \ud83d\udc03 */ water_buffalo: /\\ud83d\\udc03/,
                    /* \ud83d\udc02 */ ox: /\\ud83d\\udc02/,
                    /* \ud83d\udc04 */ cow2: /\\ud83d\\udc04/,
                    /* \ud83d\udc2a */ dromedary_camel: /\\ud83d\\udc2a/,
                    /* \ud83d\udc2b */ camel: /\\ud83d\\udc2b/,
                    /* \ud83d\udc18 */ elephant: /\\ud83d\\udc18/,
                    /* \ud83d\udc10 */ goat: /\\ud83d\\udc10/,
                    /* \ud83d\udc0f */ ram: /\\ud83d\\udc0f/,
                    /* \ud83d\udc11 */ sheep: /\\ud83d\\udc11/,
                    /* \ud83d\udc0e */ racehorse: /\\ud83d\\udc0e/,
                    /* \ud83d\udc16 */ pig2: /\\ud83d\\udc16/,
                    /* \ud83d\udc00 */ rat: /\\ud83d\\udc00/,
                    /* \ud83d\udc01 */ mouse2: /\\ud83d\\udc01/,
                    /* \ud83d\udc13 */ rooster: /\\ud83d\\udc13/,
                    /* \ud83e\udd83 */ esse_nao_tem_imagem29: /\\ud83e\\udd83/,
                    /* \ud83d\udd4a */ esse_nao_tem_imagem30: /\\ud83d\\udd4a/,
                    /* \ud83d\udc15 */ dog2: /\\ud83d\\udc15/,
                    /* \ud83d\udc29 */ poodle: /\\ud83d\\udc29/,
                    /* \ud83d\udc08 */ cat2: /\\ud83d\\udc08/,
                    /* \ud83d\udc07 */ rabbit2: /\\ud83d\\udc07/,
                    /* \ud83d\udc3f */ esse_nao_tem_imagem31: /\\ud83d\\udc3f/,
                    /* \ud83d\udc3e */ paw_prints: /\\ud83d\\udc3e/,
                    /* \ud83d\udc09 */ dragon: /\\ud83d\\udc09/,
                    /* \ud83d\udc32 */ dragon_face: /\\ud83d\\udc32/,
                    /* \ud83c\udf35 */ cactus: /\\ud83c\\udf35/,
                    /* \ud83c\udf84 */ christmas_tree: /\\ud83c\\udf84/,
                    /* \ud83c\udf32 */ evergreen_tree: /\\ud83c\\udf32/,
                    /* \ud83c\udf33 */ deciduous_tree: /\\ud83c\\udf33/,
                    /* \ud83c\udf34 */ palm_tree: /\\ud83c\\udf34/,
                    /* \ud83c\udf31 */ seedling: /\\ud83c\\udf31/,
                    /* \ud83c\udf3f */ herb: /\\ud83c\\udf3f/,
                    /* \u2618 */       esse_nao_tem_imagem32: /\\u2618/,
                    /* \ud83c\udf40 */ four_leaf_clover: /\\ud83c\\udf40/,
                    /* \ud83c\udf8d */ bamboo: /\\ud83c\\udf8d/,
                    /* \ud83c\udf8b */ tanabata_tree: /\\ud83c\\udf8b/,
                    /* \ud83c\udf43 */ leaves: /\\ud83c\\udf43/,
                    /* \ud83c\udf42 */ fallen_leaf: /\\ud83c\\udf42/,
                    /* \ud83c\udf41 */ maple_leaf: /\\ud83c\\udf41/,
                    /* \ud83c\udf3e */ ear_of_rice: /\\ud83c\\udf3e/,
                    /* \ud83c\udf3a */ hibiscus: /\\ud83c\\udf3a/,
                    /* \ud83c\udf3b */ sunflower: /\\ud83c\\udf3b/,
                    /* \ud83c\udf39 */ rose: /\\ud83c\\udf39/,
                    /* \ud83c\udf37 */ tulip: /\\ud83c\\udf37/,
                    /* \ud83c\udf3c */ blossom: /\\ud83c\\udf3c/,
                    /* \ud83c\udf38 */ cherry_blossom: /\\ud83c\\udf38/,
                    /* \ud83d\udc90 */ bouquet: /\\ud83d\\udc90/,
                    /* \ud83c\udf44 */ mushroom: /\\ud83c\\udf44/,
                    /* \ud83c\udf30 */ chestnut: /\\ud83c\\udf30/,
                    /* \ud83c\udf83 */ jack_o_lantern: /\\ud83c\\udf83/,
                    /* \ud83d\udc1a */ shell: /\\ud83d\\udc1a/,
                    /* \ud83d\udd78 */ esse_nao_tem_imagem33: /\\ud83d\\udd78/,
                    /* \ud83c\udf0e */ earth_americas: /\\ud83c\\udf0e/,
                    /* \ud83c\udf0d */ earth_africa: /\\ud83c\\udf0d/,
                    /* \ud83c\udf0f */ earth_asia: /\\ud83c\\udf0f/,
                    /* \ud83c\udf15 */ full_moon: /\\ud83c\\udf15/,
                    /* \ud83c\udf16 */ waning_gibbous_moon: /\\ud83c\\udf16/,
                    /* \ud83c\udf17 */ last_quarter_moon: /\\ud83c\\udf17/,
                    /* \ud83c\udf18 */ waning_crescent_moon: /\\ud83c\\udf18/,
                    /* \ud83c\udf11 */ new_moon: /\\ud83c\\udf11/,
                    /* \ud83c\udf12 */ waxing_crescent_moon: /\\ud83c\\udf12/,
                    /* \ud83c\udf13 */ first_quarter_moon: /\\ud83c\\udf13/,
                    /* \ud83c\udf14 */ waxing_gibbous_moon: /\\ud83c\\udf14/,
                    /* \ud83c\udf1a */ new_moon_with_face: /\\ud83c\\udf1a/,
                    /* \ud83c\udf1d */ full_moon_with_face: /\\ud83c\\udf1d/,
                    /* \ud83c\udf1b */ first_quarter_moon_with_face: /\\ud83c\\udf1b/,
                    /* \ud83c\udf1c */ last_quarter_moon_with_face: /\\ud83c\\udf1c/,
                    /* \ud83c\udf1e */ sun_with_face: /\\ud83c\\udf1e/,
                    /* \ud83c\udf19 */ crescent_moon: /\\ud83c\\udf19/,
                    /* \u2b50 */       star: /\\u2b50/,
                    /* \ud83c\udf1f */ star2: /\\ud83c\\udf1f/,
                    /* \ud83d\udcab */ dizzy: /\\ud83d\\udcab/,
                    /* \u2728 */       sparkles: /\\u2728/,
                    /* \u2604 */       esse_nao_tem_imagem34: /\\u2604/,
                    /* \u2600 */       sunny: /\\u2600/,
                    /* \ud83c\udf24 */ esse_nao_tem_imagem35: /\\ud83c\\udf24/,
                    /* \u26c5 */       partly_sunny: /\\u26c5/,
                    /* \ud83c\udf25 */ esse_nao_tem_imagem36: /\\ud83c\\udf25/,
                    /* \ud83c\udf26 */ esse_nao_tem_imagem37: /\\ud83c\\udf26/,
                    /* \u2601 */       cloud: /\\u2601/,
                    /* \ud83c\udf27 */ esse_nao_tem_imagem38: /\\ud83c\\udf27/,
                    /* \u26c8 */       esse_nao_tem_imagem39:/\\u26c8/,
                    /* \ud83c\udf29 */ esse_nao_tem_imagem40: /\\ud83c\\udf29/,
                    /* \u26a1 */       zap: /\\u26a1/,
                    /* \ud83d\udd25 */ fire: /\\ud83d\\udd25/,
                    /* \ud83d\udca5 */ boom: /\\ud83d\\udca5/,
                    /* \u2744 */       snowflake: /\\u2744/,
                    /* \ud83c\udf28 */ esse_nao_tem_imagem41: /\\ud83c\\udf28/,
                    /* \u2603 */       esse_nao_tem_imagem42: /\\u2603/,
                    /* \u26c4 */       snowman: /\\u26c4/,
                    /* \ud83c\udf2c */ esse_nao_tem_imagem43: /\\ud83c\\udf2c/,
                    /* \ud83d\udca8 */ dash: /\\ud83d\\udca8/,
                    /* \ud83c\udf2a */ esse_nao_tem_imagem44: /\\ud83c\\udf2a/,
                    /* \ud83c\udf2b */ esse_nao_tem_imagem45: /\\ud83c\\udf2b/,
                    /* \u2602 */       esse_nao_tem_imagem46: /\\u2602/,
                    /* \u2614 */       umbrella: /\\u2614/,
                    /* \ud83d\udca7 */ droplet: /\\ud83d\\udca7/,
                    /* \ud83d\udca6 */ sweat_drops: /\\ud83d\\udca6/,
                    /* \ud83c\udf0a */ ocean: /\\ud83c\\udf0a/,

                    // Emojis Comidas e Bebidas 

                    /* \ud83c\udf4f */ green_apple: /\\ud83c\\udf4f/,
                    /* \ud83c\udf4e */ apple: /\\ud83c\\udf4e/,
                    /* \ud83c\udf50 */ pear: /\\ud83c\\udf50/,
                    /* \ud83c\udf4a */ tangerine: /\\ud83c\\udf4a/,
                    /* \ud83c\udf4b */ lemon: /\\ud83c\\udf4b/,
                    /* \ud83c\udf4c */ banana: /\\ud83c\\udf4c/,
                    /* \ud83c\udf49 */ watermelon: /\\ud83c\\udf49/,
                    /* \ud83c\udf47 */ grapes: /\\ud83c\\udf47/,
                    /* \ud83c\udf53 */ strawberry: /\\ud83c\\udf53/,
                    /* \ud83c\udf48 */ melon: /\\ud83c\\udf48/,
                    /* \ud83c\udf52 */ cherries: /\\ud83c\\udf52/,
                    /* \ud83c\udf51 */ peach: /\\ud83c\\udf51/,
                    /* \ud83c\udf4d */ pineapple: /\\ud83c\\udf4d/,
                    /* \ud83c\udf45 */ tomato: /\\ud83c\\udf45/,
                    /* \ud83c\udf46 */ eggplant: /\\ud83c\\udf46/,
                    /* \ud83c\udf36 */ esse_nao_tem_imagem47: /\\ud83c\\udf36/,
                    /* \ud83c\udf3d */ corn: /\\ud83c\\udf3d/,
                    /* \ud83c\udf60 */ sweet_potato: /\\ud83c\\udf60/,
                    /* \ud83c\udf6f */ honey_pot: /\\ud83c\\udf6f/,
                    /* \ud83c\udf5e */ bread: /\\ud83c\\udf5e/,
                    /* \ud83e\uddc0 */ esse_nao_tem_imagem48: /\\ud83e\\uddc0/,
                    /* \ud83c\udf57 */ poultry_leg: /\\ud83c\\udf57/,
                    /* \ud83c\udf56 */ meat_on_bone: /\\ud83c\\udf56/,
                    /* \ud83c\udf64 */ fried_shrimp: /\\ud83c\\udf64/,
                    /* \ud83c\udf73 */ egg: /\\ud83c\\udf73/,
                    /* \ud83c\udf54 */ hamburger: /\\ud83c\\udf54/,
                    /* \ud83c\udf5f */ fries: /\\ud83c\\udf5f/,
                    /* \ud83c\udf2d */ esse_nao_tem_imagem49: /\\ud83c\\udf2d/,
                    /* \ud83c\udf55 */ pizza: /\\ud83c\\udf55/,
                    /* \ud83c\udf5d */ spaghetti: /\\ud83c\\udf5d/,
                    /* \ud83c\udf2e */ esse_nao_tem_imagem50: /\\ud83c\\udf2e/,
                    /* \ud83c\udf2f */ esse_nao_tem_imagem51: /\\ud83c\\udf2f/,
                    /* \ud83c\udf5c */ ramen: /\\ud83c\\udf5c/,
                    /* \ud83c\udf72 */ stew: /\\ud83c\\udf72/,
                    /* \ud83c\udf65 */ fish_cake: /\\ud83c\\udf65/,
                    /* \ud83c\udf63 */ sushi: /\\ud83c\\udf63/,
                    /* \ud83c\udf71 */ bento: /\\ud83c\\udf71/,
                    /* \ud83c\udf5b */ curry: /\\ud83c\\udf5b/,
                    /* \ud83c\udf59 */ rice_ball: /\\ud83c\\udf59/,
                    /* \ud83c\udf5a */ rice: /\\ud83c\\udf5a/,
                    /* \ud83c\udf58 */ rice_cracker:/\\ud83c\\udf58/,
                    /* \ud83c\udf62 */ oden: /\\ud83c\\udf62/,
                    /* \ud83c\udf61 */ dango: /\\ud83c\\udf61/,
                    /* \ud83c\udf67 */ shaved_ice: /\\ud83c\\udf67/,
                    /* \ud83c\udf68 */ ice_cream: /\\ud83c\\udf68/,
                    /* \ud83c\udf66 */ icecream: /\\ud83c\\udf66/,
                    /* \ud83c\udf70 */ cake: /\\ud83c\\udf70/,
                    /* \ud83c\udf82 */ birthday: /\\ud83c\\udf82/,
                    /* \ud83c\udf6e */ custard: /\\ud83c\\udf6e/,
                    /* \ud83c\udf6c */ candy: /\\ud83c\\udf6c/,
                    /* \ud83c\udf6d */ lollipop: /\\ud83c\\udf6d/,
                    /* \ud83c\udf6b */ chocolate_bar: /\\ud83c\\udf6b/,
                    /* \ud83c\udf7f */ esse_nao_tem_imagem54: /\\ud83c\\udf7f/,
                    /* \ud83c\udf69 */ donut: /\\ud83c\\udf69/,
                    /* \ud83c\udf6a */ cookie: /\\ud83c\\udf6a/,
                    /* \ud83c\udf7a */ beer: /\\ud83c\\udf7a/,
                    /* \ud83c\udf7b */ beers: /\\ud83c\\udf7b/,
                    /* \ud83c\udf77 */ wine_glass: /\\ud83c\\udf77/,
                    /* \ud83c\udf78 */ cocktail: /\\ud83c\\udf78/,
                    /* \ud83c\udf79 */ tropical_drink: /\\ud83c\\udf79/,
                    /* \ud83c\udf7e */ esse_nao_tem_imagem55: /\\ud83c\\udf7e/,
                    /* \ud83c\udf76 */ sake: /\\ud83c\\udf76/,
                    /* \ud83c\udf75 */ tea: /\\ud83c\\udf75/,
                    /* \u2615 */       coffee: /\\u2615/,
                    /* \ud83c\udf7c */ baby_bottle: /\\ud83c\\udf7c/,
                    /* \ud83c\udf74 */ fork_and_knife: /\\ud83c\\udf74/,
                    /* \ud83c\udf7d */ esse_nao_tem_imagem56: /\\ud83c\\udf7d/,
                    

                    // Emojis Atividades 

                    /* \u26bd */       soccer: /\\u26bd/,
                    /* \ud83c\udfc0 */ basketball: /\\ud83c\\udfc0/,
                    /* \ud83c\udfc8 */ football: /\\ud83c\\udfc8/,
                    /* \u26be */       baseball: /\\u26be/,
                    /* \ud83c\udfbe */ tennis: /\\ud83c\\udfbe/,
                    /* \ud83c\udfd0 */ esse_nao_tem_imagem57: /\\ud83c\\udfd0/,
                    /* \ud83c\udfc9 */ rugby_football: /\\ud83c\\udfc9/,
                    /* \ud83c\udfb1 */ ball8: /\\ud83c\\udfb1/,
                    /* \u26f3 */       golf: /\\u26f3/,
                    /* \ud83c\udfcc */ esse_nao_tem_imagem58: /\\ud83c\\udfcc/,
                    /* \ud83c\udfd3 */ esse_nao_tem_imagem59: /\\ud83c\\udfd3/,
                    /* \ud83c\udff8 */ esse_nao_tem_imagem60: /\\ud83c\\udff8/,
                    /* \ud83c\udfd2 */ esse_nao_tem_imagem61: /\\ud83c\\udfd2/,
                    /* \ud83c\udfd1 */ esse_nao_tem_imagem62: /\\ud83c\\udfd1/,
                    /* \ud83c\udfcf */ esse_nao_tem_imagem63: /\\ud83c\\udfcf/,
                    /* \ud83c\udfbf */ ski: /\\ud83c\\udfbf/,
                    /* \u26f7 */       esse_nao_tem_imagem64: /\\u26f7/,
                    /* \ud83c\udfc2 */ snowboarder: /\\ud83c\\udfc2/,
                    /* \u26f8 */       esse_nao_tem_imagem65: /\\u26f8/,
                    /* \ud83c\udff9 */ esse_nao_tem_imagem66: /\\ud83c\\udff9/,
                    /* \ud83c\udfa3 */ fishing_pole_and_fish: /\\ud83c\\udfa3/,
                    /* \ud83d\udea3 */ rowboat: /\\ud83d\\udea3/,
                    /* \ud83c\udffd */ swimmer: /\\ud83c\\udffd/,
                    /* \ud83c\udfc4 */ surfer: /\\ud83c\\udfc4/,
                    /* \ud83d\udec0 */ bath: /\\ud83d\\udec0/,
                    /* \u26f9 */       esse_nao_tem_imagem68: /\\u26f9/,
                    /* \ud83c\udfcb */ esse_nao_tem_imagem69: /\\ud83c\\udfcb/,
                    /* \ud83d\udeb4 */ bicyclist: /\\ud83d\\udeb4/,
                    /* \ud83d\udeb5 */ mountain_bicyclist: /\\ud83d\\udeb5/,
                    /* \ud83c\udfc7 */ horse_racing: /\\ud83c\\udfc7/,
                    /* \ud83d\udd74 */ esse_nao_tem_imagem70: /\\ud83d\\udd74/,
                    /* \ud83c\udfc6 */ trophy: /\\ud83c\\udfc6/,
                    /* \ud83c\udfbd */ running_shirt_with_sash: /\\ud83c\\udfbd/,
                    /* \ud83c\udfc5 */ esse_nao_tem_imagem71: /\\ud83c\\udfc5/,
                    /* \ud83c\udf96 */ esse_nao_tem_imagem72: /\\ud83c\\udf96/,
                    /* \ud83c\udf97 */ esse_nao_tem_imagem73: /\\ud83c\\udf97/,
                    /* \ud83c\udff5 */ esse_nao_tem_imagem74:/\\ud83c\\udff5/,
                    /* \ud83c\udfab */ ticket: /\\ud83c\\udfab/,
                    /* \ud83c\udf9f */ esse_nao_tem_imagem76: /\\ud83c\\udf9f/,
                    /* \ud83c\udfad */ performing_arts: /\\ud83c\\udfad/,
                    /* \ud83c\udfa8 */ art: /\\ud83c\\udfa8/,
                    /* \ud83c\udfaa */ circus_tent: /\\ud83c\\udfaa/,
                    /* \ud83c\udfa4 */ microphone: /\\ud83c\\udfa4/,
                    /* \ud83c\udfa7 */ headphones:/\\ud83c\\udfa7/,
                    /* \ud83c\udfbc */ musical_keyboard: /\\ud83c\\udfbc/,
                    /* \ud83c\udfb9 */ saxophone: /\\ud83c\\udfb9/,
                    /* \ud83c\udfb7 */ trumpet: /\\ud83c\\udfb7/,
                    /* \ud83c\udfba */ guitar: /\\ud83c\\udfba/,
                    /* \ud83c\udfb8 */ violin: /\\ud83c\\udfb8/,
                    /* \ud83c\udfbb */ clapper: /\\ud83c\\udfbb/,
                    /* \ud83c\udfac */ video_game: /\\ud83c\\udfac/,
                    /* \ud83c\udfae */ space_invader: /\\ud83c\\udfae/,
                    /* \ud83d\udc7e */ dart: /\\ud83d\\udc7e/,
                    /* \ud83c\udfaf */ game_die: /\\ud83c\\udfaf/,
                    /* \ud83c\udfb2 */ slot_machine: /\\ud83c\\udfb2/,
                    /* \ud83c\udfb0 */ bowling: /\\ud83c\\udfb0/,

                    // Emojis Lugares e Viagens

                    /* \ud83d\ude97 */ car: /\\ud83d\\ude97/,
                    /* \ud83d\ude95 */ taxi: /\\ud83d\\ude95/,
                    /* \ud83d\ude99 */ blue_car: /\\ud83d\\ude99/,
                    /* \ud83d\ude8c */ bus: /\\ud83d\\ude8c/,
                    /* \ud83d\ude8e */ esse_nao_tem_imagem80: /\\ud83d\\ude8e/,
                    /* \ud83c\udfce */ esse_nao_tem_imagem81: /\\ud83c\\udfce/,
                    /* \ud83d\ude93 */ police_car: /\\ud83d\\ude93/,
                    /* \ud83d\ude91 */ ambulance: /\\ud83d\\ude91/,
                    /* \ud83d\ude92 */ fire_engine: /\\ud83d\\ude92/,
                    /* \ud83d\ude90 */ minubus: /\\ud83d\\ude90/,
                    /* \ud83d\ude9a */ truck: /\\ud83d\\ude9a/,
                    /* \ud83d\ude9b */ articulated_lorry: /\\ud83d\\ude9b/,
                    /* \ud83d\ude9c */ tractor: /\\ud83d\\ude9c/,
                    /* \ud83c\udfcd */ esse_nao_tem_imagem82: /\\ud83c\\udfcd/,
                    /* \ud83d\udeb2 */ bike: /\\ud83d\\udeb2/,
                    /* \ud83d\udea8 */ rotating_light: /\\ud83d\\udea8/,
                    /* \ud83d\ude94 */ oncoming_police_car: /\\ud83d\\ude94/,
                    /* \ud83d\ude8d */ oncoming_bus: /\\ud83d\\ude8d/,
                    /* \ud83d\ude98 */ oncoming_automobile: /\\ud83d\\ude98/,
                    /* \ud83d\ude96 */ oncoming_taxi: /\\ud83d\\ude96/,
                    /* \ud83d\udea1 */ aerial_tramway: /\\ud83d\\udea1/,
                    /* \ud83d\udea0 */ mountain_cableway: /\\ud83d\\udea0/,
                    /* \ud83d\ude9f */ suspension_railway: /\\ud83d\\ude9f/,
                    /* \ud83d\ude83 */ railway_car: /\\ud83d\\ude83/,
                    /* \ud83d\ude8b */ train: /\\ud83d\\ude8b/,
                    /* \ud83d\ude9d */ monorail: /\\ud83d\\ude9d/,
                    /* \ud83d\ude84 */ esse_nao_tem_imagem84: /\\ud83d\\ude84/,
                    /* \ud83d\ude85 */ bullettrain_side: /\\ud83d\\ude85/,
                    /* \ud83d\ude88 */ light_rail: /\\ud83d\\ude88/,
                    /* \ud83d\ude9e */ mountain_railway: /\\ud83d\\ude9e/,
                    /* \ud83d\ude82 */ steam_locomotive: /\\ud83d\\ude82/,
                    /* \ud83d\ude86 */ bullettrain_front: /\\ud83d\\ude86/,
                    /* \ud83d\ude87 */ esse_nao_tem_imagem85: /\\ud83d\\ude87/,
                    /* \ud83d\ude8a */ tram: /\\ud83d\\ude8a/,
                    /* \ud83d\ude89 */ station: /\\ud83d\\ude89/,
                    /* \ud83d\ude81 */ helicopter: /\\ud83d\\ude81/,
                    /* \ud83d\udee9 */ esse_nao_tem_imagem86: /\\ud83d\\udee9/,
                    /* \u2708 */       airplane: /\\u2708/,
                    /* \ud83d\udeeb */ esse_nao_tem_imagem87: /\\ud83d\\udeeb/,
                    /* \ud83d\udeec */ esse_nao_tem_imagem88: /\\ud83d\\udeec/,
                    /* \u26f5 */       boat: /\\u26f5/,
                    /* \ud83d\udee5 */ esse_nao_tem_imagem89: /\\ud83d\\udee5/,
                    /* \ud83d\udea4 */ speedboat: /\\ud83d\\udea4/,
                    /* \u26f4 */       esse_nao_tem_imagem90: /\\u26f4/,
                    /* \ud83d\udef3 */ esse_nao_tem_imagem91: /\\ud83d\\udef3/, 
                    /* \ud83d\ude80 */ rocket: /\\ud83d\\ude80/, 
                    /* \ud83d\udef0 */ esse_nao_tem_imagem92: /\\ud83d\\udef0/,
                    /* \ud83d\udcba */ seat: /\\ud83d\\udcba/,
                    /* \u2693 */       anchor: /\\u2693/,
                    /* \ud83d\udea7 */ construction: /\\ud83d\\udea7/,
                    /* \u26fd */       fuelpump: /\\u26fd/,
                    /* \ud83d\ude8f */ busstop: /\\ud83d\\ude8f/,
                    /* \ud83d\udea6 */ vertical_traffic_light: /\\ud83d\\udea6/,
                    /* \ud83d\udea5 */ traffic_light: /\\ud83d\\udea5/,
                    /* \ud83c\udfc1 */ checkered_flag: /\\ud83c\\udfc1/,
                    /* \ud83d\udea2 */ ship: /\\ud83d\\udea2/,
                    /* \ud83c\udfa1 */ ferris_wheel: /\\ud83c\\udfa1/,
                    /* \ud83c\udfa2 */ roller_coaster: /\\ud83c\\udfa2/,
                    /* \ud83c\udfa0 */ carousel_horse: /\\ud83c\\udfa0/,
                    /* \ud83c\udfd7 */ esse_nao_tem_imagem93: /\\ud83c\\udfd7/,
                    /* \ud83c\udf01 */ foggy: /\\ud83c\\udf01/,
                    /* \ud83d\uddfc */ tokyo_tower: /\\ud83d\\uddfc/,
                    /* \ud83c\udfed */ factory1: /\\ud83c\\udfed/,
                    /* \u26f2 */       fountain: /\\u26f2/,
                    /* \ud83c\udf91 */ rice_scene: /\\ud83c\\udf91/,
                    /* \u26f0 */       esse_nao_tem_imagem94: /\\u26f0/,
                    /* \ud83c\udfd4 */ esse_nao_tem_imagem95: /\\ud83c\\udfd4/,
                    /* \ud83d\uddfb */ mount_fuji: /\\ud83d\\uddfb/,
                    /* \ud83c\udf0b */ volcano: /\\ud83c\\udf0b/,
                    /* \ud83d\uddfe */ japan: /\\ud83d\\uddfe/,
                    /* \ud83c\udfd5 */ esse_nao_tem_imagem96: /\\ud83c\\udfd5/,
                    /* \u26fa */       tent: /\\u26fa/,
                    /* \ud83c\udfde */ esse_nao_tem_imagem97: /\\ud83c\\udfde/,
                    /* \ud83d\udee3 */ esse_nao_tem_imagem98: /\\ud83d\\udee3/,
                    /* \ud83d\udee4 */ esse_nao_tem_imagem99: /\\ud83d\\udee4/,
                    /* \ud83c\udf05 */ sunrise: /\\ud83c\\udf05/,
                    /* \ud83c\udf04 */ sunrise_over_mountains: /\\ud83c\\udf04/,
                    /* \ud83c\udfdc */ esse_nao_tem_imagem100: /\\ud83c\\udfdc/,
                    /* \ud83c\udfd6 */ esse_nao_tem_imagem101: /\\ud83c\\udfd6/,
                    /* \ud83c\udfdd */ esse_nao_tem_imagem102: /\\ud83c\\udfdd/,
                    /* \ud83c\udf07 */ city_sunrise: /\\ud83c\\udf07/,
                    /* \ud83c\udf06 */ city_sunset: /\\ud83c\\udf06/,
                    /* \ud83c\udfd9 */ esse_nao_tem_imagem103: /\\ud83c\\udfd9/,
                    /* \ud83c\udf03 */ esse_nao_tem_imagem104: /\\ud83c\\udf03/,
                    /* \ud83c\udf09 */ bridge_at_night: /\\ud83c\\udf09/,
                    /* \ud83c\udf0c */ milky_way: /\\ud83c\\udf0c/,
                    /* \ud83c\udf20 */ stars: /\\ud83c\\udf20/,
                    /* \ud83c\udf87 */ sparkler: /\\ud83c\\udf87/,
                    /* \ud83c\udf86 */ fireworks: /\\ud83c\\udf86/,
                    /* \ud83c\udf08 */ rainbow: /\\ud83c\\udf08/,
                    /* \ud83c\udfd8 */ esse_nao_tem_imagem105: /\\ud83c\\udfd8/,
                    /* \ud83c\udff0 */ european_castle: /\\ud83c\\udff0/,
                    /* \ud83c\udfef */ japanese_castle: /\\ud83c\\udfef/,
                    /* \ud83c\udfdf */ esse_nao_tem_imagem106: /\\ud83c\\udfdf/,
                    /* \ud83d\uddfd */ statue_of_liberty: /\\ud83d\\uddfd/,
                    /* \ud83c\udfe0 */ house: /\\ud83c\\udfe0/,
                    /* \ud83c\udfe1 */ house_with_garden: /\\ud83c\\udfe1/,
                    /* \ud83c\udfda */ esse_nao_tem_imagem107: /\\ud83c\\udfda/,
                    /* \ud83c\udfe2 */ office: /\\ud83c\\udfe2/,
                    /* \ud83c\udfec */ department_store: /\\ud83c\\udfec/,
                    /* \ud83c\udfe3 */ post_office: /\\ud83c\\udfe3/,
                    /* \ud83c\udfe4 */ european_post_office: /\\ud83c\\udfe4/,
                    /* \ud83c\udfe5 */ hospital: /\\ud83c\\udfe5/,
                    /* \ud83c\udfe6 */ bank: /\\ud83c\\udfe6/,
                    /* \ud83c\udfe8 */ hotel: /\\ud83c\\udfe8/,
                    /* \ud83c\udfea */ convenience_store: /\\ud83c\\udfea/,
                    /* \ud83c\udfeb */ school: /\\ud83c\\udfeb/,
                    /* \ud83c\udfe9 */ love_hotel: /\\ud83c\\udfe9/,
                    /* \ud83d\udc92 */ wedding: /\\ud83d\\udc92/,
                    /* \ud83c\udfdb */ esse_nao_tem_imagem108: /\\ud83c\\udfdb/,
                    /* \u26ea */       church: /\\u26ea/,
                    /* \ud83d\udd4c */ esse_nao_tem_imagem109: /\\ud83d\\udd4c/,
                    /* \ud83d\udd4d */ esse_nao_tem_imagem110: /\\ud83d\\udd4d/,
                    /* \ud83d\udd4b */ esse_nao_tem_imagem111: /\\ud83d\\udd4b/,
                    /* \u26e9 */       esse_nao_tem_imagem112: /\\u26e9/,

                    // Emojis Objetos

                    /* \u231a */       watch: /\\u231a/,
                    /* \ud83d\udcf1 */ iphone: /\\ud83d\\udcf1/,
                    /* \ud83d\udcf2 */ calling: /\\ud83d\\udcf2/,
                    /* \ud83d\udcbb */ esse_nao_tem_imagem113: /\\ud83d\\udcbb/,
                    /* \u2328 */       esse_nao_tem_imagem114: /\\u2328/,
                    /* \ud83d\udda5 */ computer: /\\ud83d\\udda5/,
                    /* \ud83d\udda8 */ esse_nao_tem_imagem159: /\\ud83d\\udda8/,
                    /* \ud83d\uddb1 */ esse_nao_tem_imagem115: /\\ud83d\\uddb1/,
                    /* \ud83d\uddb2 */ esse_nao_tem_imagem116: /\\ud83d\\uddb2/,
                    /* \ud83d\udd79 */ esse_nao_tem_imagem117: /\\ud83d\\udd79/,
                    /* \ud83d\udddc */ esse_nao_tem_imagem118: /\\ud83d\\udddc/,
                    /* \ud83d\udcbd */ minidisc: /\\ud83d\\udcbd/,
                    /* \ud83d\udcbe */ floppy_disk: /\\ud83d\\udcbe/,
                    /* \ud83d\udcbf */ cd: /\\ud83d\\udcbf/,
                    /* \ud83d\udcc0 */ dvd: /\\ud83d\\udcc0/,
                    /* \ud83d\udcfc */ vhs: /\\ud83d\\udcfc/,
                    /* \ud83d\udcf7 */ camera: /\\ud83d\\udcf7/,
                    /* \ud83d\udcf8 */ esse_nao_tem_imagem119: /\\ud83d\\udcf8/,
                    /* \ud83d\udcf9 */ video_camera: /\\ud83d\\udcf9/,
                    /* \ud83c\udfa5 */ movie_camera: /\\ud83c\\udfa5/,
                    /* \ud83d\udcfd */ esse_nao_tem_imagem120: /\\ud83d\\udcfd/,
                    /* \ud83c\udf9e */ esse_nao_tem_imagem121: /\\ud83c\\udf9e/,
                    /* \ud83d\udcde */ telephone_receiver: /\\ud83d\\udcde/,
                    /* \u260e */       telephone: /\\u260e/,
                    /* \ud83d\udcdf */ pager: /\\ud83d\\udcdf/,
                    /* \ud83d\udce0 */ fax: /\\ud83d\\udce0/,
                    /* \ud83d\udcfa */ tv: /\\ud83d\\udcfa/,
                    /* \ud83d\udcfb */ radio: /\\ud83d\\udcfb/,
                    /* \ud83c\udf99 */ esse_nao_tem_imagem122: /\\ud83c\\udf99/,
                    /* \ud83c\udf9a */ esse_nao_tem_imagem123: /\\ud83c\\udf9a/,
                    /* \ud83c\udf9b */ esse_nao_tem_imagem124: /\\ud83c\\udf9b/,
                    /* \u23f1 */       esse_nao_tem_imagem125: /\\u23f1/,
                    /* \u23f2 */       esse_nao_tem_imagem126: /\\u23f2/,
                    /* \u23f0 */       alarm_clock: /\\u23f0/,
                    /* \ud83d\udd70 */ hourglass_flowing_sand: /\\ud83d\\udd70/,
                    /* \u23f3 */       hourglass: /\\u23f3/,
                    /* \u231b */       esse_nao_tem_imagem129:/\\u231b/,
                    /* \ud83d\udce1 */ satellite: /\\ud83d\\udce1/,
                    /* \ud83d\udd0b */ battery: /\\ud83d\\udd0b/,
                    /* \ud83d\udd0c */ electric_plug: /\\ud83d\\udd0c/,
                    /* \ud83d\udca1 */ bulb: /\\ud83d\\udca1/,
                    /* \ud83d\udd26 */ flashlight: /\\ud83d\\udd26/,
                    /* \ud83d\udd6f */ esse_nao_tem_imagem130: /\\ud83d\\udd6f/,
                    /* \ud83d\uddd1 */ esse_nao_tem_imagem131: /\\ud83d\\uddd1/,
                    /* \ud83d\udee2 */ esse_nao_tem_imagem132: /\\ud83d\\udee2/,
                    /* \ud83d\udcb8 */ money_with_wings: /\\ud83d\\udcb8/,
                    /* \ud83d\udcb5 */ dollar: /\\ud83d\\udcb5/,
                    /* \ud83d\udcb4 */ yen: /\\ud83d\\udcb4/,
                    /* \ud83d\udcb6 */ euro: /\\ud83d\\udcb6/,
                    /* \ud83d\udcb7 */ pound: /\\ud83d\\udcb7/,
                    /* \ud83d\udcb0 */ moneybag: /\\ud83d\\udcb0/,
                    /* \ud83d\udcb3 */ credit_card: /\\ud83d\\udcb3/,
                    /* \ud83d\udc8e */ gem: /\\ud83d\\udc8e/,
                    /* \u2696 */       esse_nao_tem_imagem133: /\\u2696/,
                    /* \ud83d\udd27 */ wrench: /\\ud83d\\udd27/,
                    /* \ud83d\udd28 */ esse_nao_tem_imagem134: /\\ud83d\\udd28/,
                    /* \u2692 */       esse_nao_tem_imagem135: /\\u2692/,
                    /* \ud83d\udee0 */ esse_nao_tem_imagem136: /\\ud83d\\udee0/,
                    /* \u26cf */       esse_nao_tem_imagem137: /\\u26cf/,
                    /* \ud83d\udd29 */ nut_and_bolt: /\\ud83d\\udd29/,
                    /* \u2699 */       esse_nao_tem_imagem138: /\\u2699/,
                    /* \u26d3 */       esse_nao_tem_imagem139: /\\u26d3/,
                    /* \ud83d\udd2b */ gun: /\\ud83d\\udd2b/,
                    /* \ud83d\udca3 */ bomb: /\\ud83d\\udca3/,
                    /* \ud83d\udd2a */ hocho: /\\ud83d\\udd2a/,
                    /* \ud83d\udde1 */ esse_nao_tem_imagem140: /\\ud83d\\udde1/,
                    /* \u2694 */       esse_nao_tem_imagem141: /\\u2694/,
                    /* \ud83d\udee1 */ esse_nao_tem_imagem142: /\\ud83d\\udee1/,
                    /* \ud83d\udeac */ smoking: /\\ud83d\\udeac/,
                    /* \u2620 */       esse_nao_tem_imagem143:/\\u2620/,
                    /* \u26b0 */       esse_nao_tem_imagem144: /\\u26b0/,
                    /* \u26b1 */       esse_nao_tem_imagem145: /\\u26b1/,
                    /* \ud83c\udffa */ esse_nao_tem_imagem146: /\\ud83c\\udffa/,
                    /* \ud83d\udd2e */ esse_nao_tem_imagem147: /\\ud83d\\udd2e/,
                    /* \ud83d\udcff */ esse_nao_tem_imagem148: /\\ud83d\\udcff/,
                    /* \ud83d\udc88 */ barber: /\\ud83d\\udc88/,
                    /* \u2697 */       esse_nao_tem_imagem149: /\\u2697/,
                    /* \ud83d\udd2d */ telescope: /\\ud83d\\udd2d/,
                    /* \ud83d\udd2c */ microscope: /\\ud83d\\udd2c/,
                    /* \ud83d\udd73 */ esse_nao_tem_imagem150: /\\ud83d\\udd73/,
                    /* \ud83d\udc8a */ pill: /\\ud83d\\udc8a/,
                    /* \ud83d\udc89 */ syringe: /\\ud83d\\udc89/, 
                    /* \ud83c\udf21 */ esse_nao_tem_imagem151: /\\ud83c\\udf21/,
                    /* \ud83c\udff7 */ esse_nao_tem_imagem152: /\\ud83c\\udff7/,
                    /* \ud83d\udd16 */ bookmark: /\\ud83d\\udd16/,
                    /* \ud83d\udebd */ toilet: /\\ud83d\\udebd/,
                    /* \ud83d\udebf */ shower: /\\ud83d\\udebf/,
                    /* \ud83d\udec1 */ bathtub: /\\ud83d\\udec1/,
                    /* \ud83d\udd11 */ key: /\\ud83d\\udd11/,
                    /* \ud83d\udddd */ esse_nao_tem_imagem153: /\\ud83d\\udddd/,
                    /* \ud83d\udecb */ esse_nao_tem_imagem154: /\\ud83d\\udecb/,
                    /* \ud83d\udecc */ esse_nao_tem_imagem155: /\\ud83d\\udecc/,
                    /* \ud83d\udecf */ esse_nao_tem_imagem156: /\\ud83d\\udecf/,
                    /* \ud83d\udeaa */ door: /\\ud83d\\udeaa/,
                    /* \ud83d\udece */ esse_nao_tem_imagem157: /\\ud83d\\udece/,
                    /* \ud83d\uddbc */ esse_nao_tem_imagem158: /\\ud83d\\uddbc/,
                    /* \ud83d\uddfa */ esse_nao_tem_imagem160: /\\ud83d\\uddfa/,
                    /* \u26f1 */       esse_nao_tem_imagem161: /\\u26f1/,
                    /* \ud83d\uddff */ moyai: /\\ud83d\\uddff/,
                    /* \ud83d\udecd */ esse_nao_tem_imagem162: /\\ud83d\\udecd/,
                    /* \ud83c\udf88 */ balloon: /\\ud83c\\udf88/,
                    /* \ud83c\udf8f */ flags: /\\ud83c\\udf8f/,
                    /* \ud83c\udf80 */ ribbon: /\\ud83c\\udf80/,
                    /* \ud83c\udf81 */ gift: /\\ud83c\\udf81/,
                    /* \ud83c\udf8a */ confetti_ball: /\\ud83c\\udf8a/,
                    /* \ud83c\udf89 */ tada: /\\ud83c\\udf89/,
                    /* \ud83c\udf8e */ dolls: /\\ud83c\\udf8e/,
                    /* \ud83c\udf90 */ wind_chime: /\\ud83c\\udf90/,
                    /* \ud83c\udf8c */ crossed_flags: /\\ud83c\\udf8c/,
                    /* \ud83c\udfee */ izakaya_lantern: /\\ud83c\\udfee/,
                    /* \u2709 */       envelope: /\\u2709/,
                    /* \ud83d\udce9 */ email: /\\ud83d\\udce9/,
                    /* \ud83d\udce8 */ incoming_envelope: /\\ud83d\\udce8/,
                    /* \ud83d\udce7 */ e_mail: /\\ud83d\\udce7/,
                    /* \ud83d\udc8c */ love_letter: /\\ud83d\\udc8c/,
                    /* \ud83d\udcee */ postbox: /\\ud83d\\udcee/,
                    /* \ud83d\udcea */ mailbox_closed: /\\ud83d\\udcea/,
                    /* \ud83d\udceb */ mailbox: /\\ud83d\\udceb/,
                    /* \ud83d\udcec */ mailbox_with_mail: /\\ud83d\\udcec/,
                    /* \ud83d\udced */ mailbox_with_no_mail: /\\ud83d\\udced/,
                    /* \ud83d\udce6 */ package: /\\ud83d\\udce6/,
                    /* \ud83d\udcef */ postal_horn: /\\ud83d\\udcef/,
                    /* \ud83d\udce5 */ inbox_tray: /\\ud83d\\udce5/,
                    /* \ud83d\udce4 */ outbox_tray: /\\ud83d\\udce4/,
                    /* \ud83d\udcdc */ scroll: /\\ud83d\\udcdc/,
                    /* \ud83d\udcc3 */ page_with_curl: /\\ud83d\\udcc3/,
                    /* \ud83d\udcd1 */ bookmark_tabs: /\\ud83d\\udcd1/,
                    /* \ud83d\udcca */ bar_chart: /\\ud83d\\udcca/,
                    /* \ud83d\udcc8 */ chart_with_upwards_trend: /\\ud83d\\udcc8/,
                    /* \ud83d\udcc9 */ chart_with_downwards_trend: /\\ud83d\\udcc9/,
                    /* \ud83d\udcc4 */ page_facing_up: /\\ud83d\\udcc4/,
                    /* \ud83d\udcc5 */ date: /\\ud83d\\udcc5/,
                    /* \ud83d\udcc6 */ calendar: /\\ud83d\\udcc6/,
                    /* \ud83d\uddd3 */ esse_nao_tem_imagem163: /\\ud83d\\uddd3/,
                    /* \ud83d\udcc7 */ card_index: /\\ud83d\\udcc7/,
                    /* \ud83d\uddc3 */ esse_nao_tem_imagem164: /\\ud83d\\uddc3/,
                    /* \ud83d\uddf3 */ esse_nao_tem_imagem165: /\\ud83d\\uddf3/,
                    /* \ud83d\uddc4 */ esse_nao_tem_imagem166: /\\ud83d\\uddc4/,
                    /* \ud83d\udccb */ clipboard: /\\ud83d\\udccb/,
                    /* \ud83d\uddd2 */ esse_nao_tem_imagem167: /\\ud83d\\uddd2/,
                    /* \ud83d\udcc1 */ file_folder: /\\ud83d\\udcc1/,
                    /* \ud83d\udcc2 */ open_file_folder: /\\ud83d\\udcc2/,
                    /* \ud83d\uddc2 */ esse_nao_tem_imagem168: /\\ud83d\\uddc2/,
                    /* \ud83d\uddde */ esse_nao_tem_imagem169: /\\ud83d\\uddde/,
                    /* \ud83d\udcf0 */ newspaper: /\\ud83d\\udcf0/,
                    /* \ud83d\udcd3 */ notebook: /\\ud83d\\udcd3/,
                    /* \ud83d\udcd5 */ closed_book: /\\ud83d\\udcd5/,
                    /* \ud83d\udcd7 */ green_book: /\\ud83d\\udcd7/,
                    /* \ud83d\udcd8 */ blue_book: /\\ud83d\\udcd8/,
                    /* \ud83d\udcd9 */ orange_book: /\\ud83d\\udcd9/,
                    /* \ud83d\udcd4 */ notebook_with_decorative_cover:/\\ud83d\\udcd4/,
                    /* \ud83d\udcd2 */ ledger: /\\ud83d\\udcd2/,
                    /* \ud83d\udcda */ books: /\\ud83d\\udcda/,
                    /* \ud83d\udcd6 */ book: /\\ud83d\\udcd6/,
                    /* \ud83d\udd17 */ link: /\\ud83d\\udd17/,
                    /* \ud83d\udcce */ paperclip: /\\ud83d\\udcce/,
                    /* \ud83d\udd87 */ esse_nao_tem_imagem170: /\\ud83d\\udd87/,
                    /* \u2702 */       scissors: /\\u2702/,
                    /* \ud83d\udcd0 */ triangular_ruler: /\\ud83d\\udcd0/,
                    /* \ud83d\udccf */ straight_ruler: /\\ud83d\\udccf/,
                    /* \ud83d\udccc */ pushpin: /\\ud83d\\udccc/,
                    /* \ud83d\udccd */ round_pushpin: /\\ud83d\\udccd/,
                    /* \ud83d\udea9 */ triangular_flag_on_post: /\\ud83d\\udea9/,
                    /* \ud83c\udff3 */ esse_nao_tem_imagem171: /\\ud83c\\udff3/,
                    /* \ud83c\udff4 */ esse_nao_tem_imagem172: /\\ud83c\\udff4/,
                    /* \ud83d\udd10 */ closed_lock_with_key: /\\ud83d\\udd10/,
                    /* \ud83d\udd12 */ lock: /\\ud83d\\udd12/,
                    /* \ud83d\udd13 */ unlock: /\\ud83d\\udd13/,
                    /* \ud83d\udd0f */ lock_with_ink_pen: /\\ud83d\\udd0f/,
                    /* \ud83d\udd8a */ esse_nao_tem_imagem173: /\\ud83d\\udd8a/,
                    /* \ud83d\udd8b */ esse_nao_tem_imagem174: /\\ud83d\\udd8b/,
                    /* \u2712 */       black_nib: /\\u2712/,
                    /* \ud83d\udcdd */ pencil: /\\ud83d\\udcdd/,
                    /* \u270f */       pencil2: /\\u270f/,
                    /* \ud83d\udd8d */ esse_nao_tem_imagem175: /\\ud83d\\udd8d/,
                    /* \ud83d\udd8c */ esse_nao_tem_imagem176: /\\ud83d\\udd8c/,
                    /* \ud83d\udd0d */ mag: /\\ud83d\\udd0d/,
                    /* \ud83d\udd0e */ mag_right: /\\ud83d\\udd0e/,

                    // Emojis Simbolos 

                    /* \u2764 */       heart: /\\u2764/,
                    /* \ud83d\udc9b */ yellow_heart: /\\ud83d\\udc9b/,
                    /* \ud83d\udc9a */ green_heart: /\\ud83d\\udc9a/,
                    /* \ud83d\udc99 */ blue_heart: /\\ud83d\\udc99/,
                    /* \ud83d\udc9c */ purple_heart: /\\ud83d\\udc9c/,
                    /* \ud83d\udc94 */ broken_heart: /\\ud83d\\udc94/,
                    /* \u2763 */       esse_nao_tem_imagem177: /\\u2763/,
                    /* \ud83d\udc95 */ two_hearts: /\\ud83d\\udc95/,
                    /* \ud83d\udc9e */ revolving_hearts: /\\ud83d\\udc9e/,
                    /* \ud83d\udc93 */ heartbeat: /\\ud83d\\udc93/,
                    /* \ud83d\udc97 */ heartpulse: /\\ud83d\\udc97/,
                    /* \ud83d\udc96 */ sparkling_heart: /\\ud83d\\udc96/,
                    /* \ud83d\udc98 */ cupid: /\\ud83d\\udc98/,
                    /* \ud83d\udc9d */ gift_heart: /\\ud83d\\udc9d/,
                    /* \ud83d\udc9f */ heart_decoration: /\\ud83d\\udc9f/,
                    /* \u262e */       esse_nao_tem_imagem178: /\\u262e/,
                    /* \u271d */       esse_nao_tem_imagem179: /\\u271d/,
                    /* \u262a */       esse_nao_tem_imagem180:/\\u262a/,
                    /* \ud83d\udd49 */ esse_nao_tem_imagem181: /\\ud83d\\udd49/,
                    /* \u2638 */       esse_nao_tem_imagem182: /\\u2638/,
                    /* \u2721 */       esse_nao_tem_imagem183: /\\u2721/,
                    /* \ud83d\udd2f */ six_pointed_star: /\\ud83d\\udd2f/,
                    /* \ud83d\udd4e */ esse_nao_tem_imagem184: /\\ud83d\\udd4e/,
                    /* \u262f */       esse_nao_tem_imagem185: /\\u262f/,
                    /* \u2626 */       esse_nao_tem_imagem186: /\\u2626/,
                    /* \ud83d\uded0 */ esse_nao_tem_imagem187: /\\ud83d\\uded0/,
                    /* \u26ce */       ophiuchus: /\\u26ce/,
                    /* \u2648 */       aries: /\\u2648/,
                    /* \u2649 */       taurus: /\\u2649/,
                    /* \u264a */       gemini: /\\u264a/,
                    /* \u264b */       cancer: /\\u264b/,
                    /* \u264c */       leo: /\\u264c/,
                    /* \u264d */       virgo: /\\u264d/,
                    /* \u264e */       libra: /\\u264e/,
                    /* \u264f */       scorpius: /\\u264f/,
                    /* \u2650 */       esse_nao_tem_imagem188: /\\u2650/,
                    /* \u2651 */       capricorn: /\\u2651/,
                    /* \u2652 */       aquarius: /\\u2652/,
                    /* \u2653 */       pisces: /\\u2653/,
                    /* \ud83c\udd94 */ id: /\\ud83c\\udd94/,
                    /* \u269b */       esse_nao_tem_imagem189: /\\u269b/,
                    /* \ud83c\ude33 */ u7a7a: /\\ud83c\\ude33/,
                    /* \ud83c\ude39 */ u5272: /\\ud83c\\ude39/,
                    /* \u2622 */       esse_nao_tem_imagem190: /\\u2622/,
                    /* \u2622 */       esse_nao_tem_imagem191: /\\u2622/,
                    /* \u2623 */       mobile_phone_off: /\\u2623/,
                    /* \ud83d\udcf4 */ vibration_mode: /\\ud83d\\udcf4/,
                    /* \ud83d\udcf3 */ u6709: /\\ud83d\\udcf3/,
                    /* \ud83c\ude36 */ u7121: /\\ud83c\\ude36/,
                    /* \ud83c\ude1a */ u7533: /\\ud83c\\ude1a/,
                    /* \ud83c\ude38 */ u55b6: /\\ud83c\\ude38/,
                    /* \ud83c\ude3a */ u6708: /\\ud83c\\ude3a/, 
                    /* \ud83c\ude37 */ eight_pointed_black_star: /\\ud83c\\ude37/,
                    /* \u2734 */       vs: /\\u2734/,
                    /* \ud83c\udd9a */ accept: /\\ud83c\\udd9a/,
                    /* \ud83c\ude51 */ white_flower: /\\ud83c\\ude51/,
                    /* \ud83d\udcae */ ideograph_advantage: /\\ud83d\\udcae/,
                    /* \ud83c\ude50 */ esse_nao_tem_imagem192: /\\ud83c\\ude50/,
                    /* \u3299 */       congratulations: /\\u3299/,
                    /* \u3297 */       u5408: /\\u3297/,
                    /* \ud83c\ude34 */ u6e80: /\\ud83c\\ude34/,
                    /* \ud83c\ude35 */ u7981: /\\ud83c\\ude35/,
                    /* \ud83c\ude32 */ a: /\\ud83c\\ude32/,
                    /* \ud83c\udd70 */ b: /\\ud83c\\udd70/,
                    /* \ud83c\udd71 */ ab: /\\ud83c\\udd71/,
                    /* \ud83c\udd8e */ cl: /\\ud83c\\udd8e/,
                    /* \ud83c\udd91 */ o2: /\\ud83c\\udd91/,
                    /* \ud83c\udd7e */ sos: /\\ud83c\\udd7e/,
                    /* \ud83c\udd98 */ no_entry: /\\ud83c\\udd98/,
                    /* \u26d4 */       name_badge: /\\u26d4/,
                    /* \ud83d\udcdb */ no_entry_sign: /\\ud83d\\udcdb/,
                    /* \ud83d\udeab */ x: /\\ud83d\\udeab/,
                    /* \u274c */       o: /\\u274c/,
                    /* \u2b55 */       anger: /\\u2b55/,
                    /* \ud83d\udca2 */ hotsprings: /\\ud83d\\udca2/,
                    /* \u2668 */       no_pedestrians: /\\u2668/,
                    /* \ud83d\udeb7 */ do_not_litter: /\\ud83d\\udeb7/,
                    /* \ud83d\udeaf */ no_bicycles: /\\ud83d\\udeaf/,
                    /* \ud83d\udeb1 */ non_potable_water: /\\ud83d\\udeb1/,
                    /* \ud83d\udd1e */ underage: /\\ud83d\\udd1e/,
                    /* \ud83d\udcf5 */ no_mobile_phones: /\\ud83d\\udcf5/,
                    /* \u2757 */       exclamation: /\\u2757/,
                    /* \u2755 */       grey_exclamation: /\\u2755/,
                    /* \u2753 */       question: /\\u2753/,
                    /* \u2754 */       grey_question: /\\u2754/,
                    /* \u203c */       bangbang: /\\u203c/,
                    /* \u2049 */       interrobang: /\\u2049/,
                    /* \ud83d\udcaf */ cem: /\\ud83d\\udcaf/,
                    /* \ud83d\udd05 */ low_brightness: /\\ud83d\\udd05/,
                    /* \ud83d\udd06 */ high_brightness: /\\ud83d\\udd06/,
                    /* \ud83d\udd31 */ trident: /\\ud83d\\udd31/,
                    /* \u269c */       esse_nao_tem_imagem193: /\\u269c/,
                    /* \u303d */       part_alternation_mark: /\\u303d/,
                    /* \u26a0 */       warning: /\\u26a0/,
                    /* \ud83d\udeb8 */ children_crossing: /\\ud83d\\udeb8/,
                    /* \ud83d\udd30 */ beginner: /\\ud83d\\udd30/,
                    /* \u267b */       recycle: /\\u267b/,
                    /* \ud83c\ude2f */ u6307: /\\ud83c\\ude2f/,
                    /* \ud83d\udcb9 */ chart: /\\ud83d\\udcb9/,
                    /* \u2747 */       sparkle: /\\u2747/,
                    /* \u2733 */       eight_spoked_asterisk: /\\u2733/,
                    /* \u274e */       negative_squared_cross_mark: /\\u274e/,
                    /* \u2705 */       white_check_mark: /\\u2705/,
                    /* \ud83d\udca0 */ diamond_shape_with_a_dot_inside: /\\ud83d\\udca0/,
                    /* \ud83c\udf00 */ cyclone: /\\ud83c\\udf00/,
                    /* \u27bf */       loop: /\\u27bf/,
                    /* \ud83c\udf10 */ globe_with_meridians: /\\ud83c\\udf10/,
                    /* \u24c2 */       m: /\\u24c2/,
                    /* \ud83c\udfe7 */ atm: /\\ud83c\\udfe7/,
                    /* \ud83c\ude02 */ sa: /\\ud83c\\ude02/,
                    /* \ud83d\udec2 */ passport_control: /\\ud83d\\udec2/,
                    /* \ud83d\udec3 */ customs: /\\ud83d\\udec3/,
                    /* \ud83d\udec4 */ baggage_claim: /\\ud83d\\udec4/,
                    /* \ud83d\udec5 */ left_luggage: /\\ud83d\\udec5/,
                    /* \u267f */       wheelchair: /\\u267f/,
                    /* \ud83d\udead */ no_smoking: /\\ud83d\\udead/,
                    /* \ud83d\udebe */ wc: /\\ud83d\\udebe/,
                    /* \ud83c\udd7f */ parking: /\\ud83c\\udd7f/,
                    /* \ud83d\udeb0 */ potable_water: /\\ud83d\\udeb0/,
                    /* \ud83d\udeb9 */ mens: /\\ud83d\\udeb9/,
                    /* \ud83d\udeba */ womens: /\\ud83d\\udeba/,
                    /* \ud83d\udebc */ baby_symbol: /\\ud83d\\udebc/,
                    /* \ud83d\udebb */ restroom: /\\ud83d\\udebb/,
                    /* \ud83d\udeae */ put_litter_in_its_place: /\\ud83d\\udeae/,
                    /* \ud83c\udfa6 */ cinema: /\\ud83c\\udfa6/,
                    /* \ud83d\udcf6 */ signal_strength: /\\ud83d\\udcf6/,
                    /* \ud83c\ude01 */ koko: /\\ud83c\\ude01/,
                    /* \ud83c\udd96 */ ng: /\\ud83c\\udd96/,
                    /* \ud83c\udd97 */ ok: /\\ud83c\\udd97/,
                    /* \ud83c\udd99 */ up: /\\ud83c\\udd99/,
                    /* \ud83c\udd92 */ cool: /\\ud83c\\udd92/,
                    /* \ud83c\udd95 */ new: /\\ud83c\\udd95/,
                    /* \ud83c\udd93 */ free: /\\ud83c\\udd93/,
                    /* 0\u20e3 */      zero: /0\\u20e3/,
                    /* 1\u20e3 */      one: /1\\u20e3/,
                    /* 2\u20e3 */      two: /2\\u20e3/,
                    /* 3\u20e3 */      three: /3\\u20e3/,
                    /* 4\u20e3 */      four: /4\\u20e3/,
                    /* 5\u20e3 */      five: /5\\u20e3/,
                    /* 6\u20e3 */      six: /6\\u20e3/,
                    /* 7\u20e3 */      seven: /7\\u20e3/,
                    /* 8\u20e3 */      eight: /8\\u20e3/,
                    /* 9\u20e3 */      nine: /9\\u20e3/,
                    /* \ud83d\udd1f */ keycap_ten: /\\ud83d\\udd1f/,
                    /* \ud83d\udd22 */ comb_1234: /\\ud83d\\udd22/,
                    /* \u25b6 */       arrow_forward: /\\u25b6/,
                    /* \u23f8 */       esse_nao_tem_imagem194: /\\u23f8/,
                    /* \u23ef */       esse_nao_tem_imagem195: /\\u23ef/,
                    /* \u23f9 */       esse_nao_tem_imagem196: /\\u23f9/,
                    /* \u23fa */       esse_nao_tem_imagem197: /\\u23fa/,
                    /* \u23ed */       esse_nao_tem_imagem198: /\\u23ed/,
                    /* \u23ee */       esse_nao_tem_imagem199: /\\u23ee/,
                    /* \u23e9 */       fast_forward: /\\u23e9/,
                    /* \u23ea */       esse_nao_tem_imagem200: /\\u23ea/,
                    /* \ud83d\udd00 */ twisted_rightwards_arrows: /\\ud83d\\udd00/,
                    /* \ud83d\udd01 */ repeat: /\\ud83d\\udd01/,
                    /* \ud83d\udd02 */ repeat_one: /\\ud83d\\udd02/,
                    /* \u25c0 */       arrow_backward: /\\u25c0/,
                    /* \ud83d\udd3c */ arrow_up_small: /\\ud83d\\udd3c/,
                    /* \ud83d\udd3d */ arrow_down_small: /\\ud83d\\udd3d/, 
                    /* \u23eb */       arrow_double_up: /\\u23eb/,
                    /* \u23ec */       arrow_double_down: /\\u23ec/,
                    /* \u27a1 */       arrow_right: /\\u27a1/,
                    /* \u2b05 */       arrow_left: /\\u2b05/,
                    /* \u2b06 */       arrow_up: /\\u2b06/,
                    /* \u2b07 */       arrow_down: /\\u2b07/,
                    /* \u2197 */       arrow_upper_right: /\\u2197/,
                    /* \u2198 */       arrow_lower_right: /\\u2198/,
                    /* \u2199 */       arrow_lower_left: /\\u2199/,
                    /* \u2196 */       arrow_upper_left: /\\u2196/,
                    /* \u2195 */       arrow_up_down: /\\u2195/,
                    /* \u2194 */       left_right_arrow: /\\u2194/,
                    /* \ud83d\udd04 */ arrows_counterclockwise: /\\ud83d\\udd04/,
                    /* \u21aa */       arrow_right_hook: /\\u21aa/,
                    /* \u21a9 */       leftwards_arrow_with_hook: /\\u21a9/,
                    /* \u2934 */       arrow_heading_up: /\\u2934/,
                    /* \u2935 */       arrow_heading_down: /\\u2935/,
                    /* #\u20e3 */      hash: /#\\u20e3/,
                    // /* *\u20e3 */      esse_nao_tem_imagem201: /*\\u20e3/
                    /* \u2139 */       information_source: /\\u2139/,
                    /* \ud83d\udd24 */ abc: /\\ud83d\\udd24/,
                    /* \ud83d\udd21 */ abcd: /\\ud83d\\udd21/,
                    /* \ud83d\udd20 */ capital_abcd: /\\ud83d\\udd20/,
                    /* \ud83d\udd23 */ symbols: /\\ud83d\\udd23/,
                    /* \ud83c\udfb5 */ musical_note: /\\ud83c\\udfb5/,
                    /* \ud83c\udfb6 */ notes: /\\ud83c\\udfb6/,
                    /* \u3030 */       wavy_dash: /\\u3030/,
                    /* \u27b0 */       curly_loop: /\\u27b0/,
                    /* \u2714 */       heavy_check_mark: /\\u2714/,
                    /* \ud83d\udd03 */ arrows_clockwise: /\\ud83d\\udd03/,
                    /* \u2795 */       heavy_plus_sign: /\\u2795/,
                    /* \u2796 */       heavy_minus_sign: /\\u2796/,
                    /* \u2797 */       heavy_division_sign: /\\u2797/,
                    /* \u2716 */       heavy_multiplication_x: /\\u2716/,
                    /* \ud83d\udcb2 */ heavy_dollar_sign: /\\ud83d\\udcb2/,
                    /* \ud83d\udcb1 */ currency_exchange: /\\ud83d\\udcb1/,
                    /* \u00a9 */       copyright: /\\u00a9/,
                    /* \u00ae */       registered: /\\u00ae/ ,
                    /* \u2122 */       tm: /\\u2122/,
                    /* \ud83d\udd1a */ end: /\\ud83d\\udd1a/,
                    /* \ud83d\udd19 */ back: /\\ud83d\\udd19/,
                    /* \ud83d\udd1b */ on: /\\ud83d\\udd1b/,
                    /* \ud83d\udd1d */ top: /\\ud83d\\udd1d/,
                    /* \ud83d\udd1c */ soon:/\\ud83d\\udd1c/,
                    /* \u2611 */       ballot_box_with_check: /\\u2611/,
                    /* \ud83d\udd18 */ radio_button: /\\ud83d\\udd18/,
                    /* \u26aa */       white_circle: /\\u26aa/,
                    /* \u26ab */       black_circle: /\\u26ab/,
                    /* \ud83d\udd34 */ red_circle: /\\ud83d\\udd34/,
                    /* \ud83d\udd35 */ large_blue_circle: /\\ud83d\\udd35/,
                    /* \ud83d\udd38 */ small_orange_diamond: /\\ud83d\\udd38/,
                    /* \ud83d\udd39 */ small_blue_diamond: /\\ud83d\\udd39/,
                    /* \ud83d\udd36 */ large_orange_diamond: /\\ud83d\\udd36/,
                    /* \ud83d\udd37 */ large_blue_diamond: /\\ud83d\\udd37/,
                    /* \ud83d\udd3a */ small_red_triangle: /\\ud83d\\udd3a/,
                    /* \u25aa */       black_small_square: /\\u25aa/,
                    /* \u25ab */       white_small_square: /\\u25ab/,
                    /* \u2b1b */       black_medium_square: /\\u2b1b/,
                    /* \u2b1c */       white_large_square: /\\u2b1c/,
                    /* \ud83d\udd3b */ small_red_triangle_down: /\\ud83d\\udd3b/,
                    /* \u25fc */       black_square: /\\u25fc/,
                    /* \u25fb */       white_medium_square: /\\u25fb/,
                    /* \u25fe */       black_medium_small_square: /\\u25fe/,
                    /* \u25fd */       white_medium_small_square: /\\u25fd/,
                    /* \ud83d\udd32 */ black_square_button: /\\ud83d\\udd32/,
                    /* \ud83d\udd33 */ white_square_button: /\\ud83d\\udd33/,
                    /* \ud83d\udd08 */ speaker: /\\ud83d\\udd08/,
                    /* \ud83d\udd09 */ sound: /\\ud83d\\udd09/,
                    /* \ud83d\udd0a */ esse_nao_tem_imagem202: /\\ud83d\\udd0a/,
                    /* \ud83d\udd07 */ mute: /\\ud83d\\udd07/,
                    /* \ud83d\udce3 */ mega: /\\ud83d\\udce3/,
                    /* \ud83d\udce2 */ loudspeaker: /\\ud83d\\udce2/,
                    /* \ud83d\udd14 */ bell: /\\ud83d\\udd14/,
                    /* \ud83d\udd15 */ np_bell: /\\ud83d\\udd15/,
                    /* \ud83c\udccf */ black_joker: /\\ud83c\\udccf/,
                    /* \ud83c\udc04 */ mahjong: /\\ud83c\\udc04/,
                    /* \u2660 */       spades: /\\u2660/,
                    /* \u2663 */       clubs: /\\u2663/,
                    /* \u2665 */       hearts: /\\u2665/,
                    /* \u2666 */       diamonds: /\\u2666/,
                    /* \ud83c\udfb4 */ flower_playing_cards: /\\ud83c\\udfb4/,
                    /* \ud83d\udc41 */ esse_nao_tem_imagem203: /\\ud83d\\udc41/,
                    /* \ud83d\udcad */ thought_balloon: /\\ud83d\\udcad/,
                    /* \ud83d\uddef */ esse_nao_tem_imagem204: /\\ud83d\\uddef/,
                    /* \ud83d\udcac */ speech_balloon: /\\ud83d\\udcac/,
                    /* \ud83d\udd50 */ clock1: /\\ud83d\\udd50/,
                    /* \ud83d\udd51 */ clock2: /\\ud83d\\udd51/,
                    /* \ud83d\udd52 */ clock3: /\\ud83d\\udd52/,
                    /* \ud83d\udd53 */ clock4: /\\ud83d\\udd53/,
                    /* \ud83d\udd54 */ clock5: /\\ud83d\\udd54/,
                    /* \ud83d\udd55 */ clock6: /\\ud83d\\udd55/,
                    /* \ud83d\udd56 */ clock7: /\\ud83d\\udd56/,
                    /* \ud83d\udd57 */ clock8: /\\ud83d\\udd57/,
                    /* \ud83d\udd58 */ clock9: /\\ud83d\\udd58/,
                    /* \ud83d\udd59 */ clock10: /\\ud83d\\udd59/,
                    /* \ud83d\udd5a */ clock11: /\\ud83d\\udd5a/,
                    /* \ud83d\udd5b */ clock12: /\\ud83d\\udd5b/,
                    /* \ud83d\udd5c */ clock13: /\\ud83d\\udd5c/,
                    /* \ud83d\udd5d */ clock14: /\\ud83d\\udd5d/,
                    /* \ud83d\udd5e */ clock15: /\\ud83d\\udd5e/,
                    /* \ud83d\udd5f */ clock16: /\\ud83d\\udd5f/,
                    /* \ud83d\udd60 */ clock17: /\\ud83d\\udd60/,
                    /* \ud83d\udd61 */ clock18: /\\ud83d\\udd61/,
                    /* \ud83d\udd62 */ clock19: /\\ud83d\\udd62/,
                    /* \ud83d\udd63 */ clock20: /\\ud83d\\udd63/,
                    /* \ud83d\udd64 */ clock21: /\\ud83d\\udd64/,
                    /* \ud83d\udd65 */ clock22: /\\ud83d\\udd65/,
                    /* \ud83d\udd66 */ clock23: /\\ud83d\\udd66/,
                    /* \ud83d\udd67 */ clock24: /\\ud83d\\udd67/,


                    // Emojis Bandeiras 

                    /* \ud83c\udde8 */ cn: /\\ud83c\\udde8/,
                    /* \ud83c\udde9 */ de: /\\ud83c\\udde9/,
                    /* \ud83c\uddea */ es: /\\ud83c\\uddea/,
                    /* \ud83c\uddeb */ fr: /\\ud83c\\uddeb/,
                    /* \ud83c\uddec */ gb: /\\ud83c\\uddec/,
                    /* \ud83c\uddef */ jp: /\\ud83c\\uddef/,
                    /* \ud83c\uddf0 */ kr: /\\ud83c\\uddf0/,
                    /* \ud83c\uddf7 */ ru: /\\ud83c\\uddf7/,
                    /* \ud83c\uddfa */ uk: /\\ud83c\\uddfa/,
                    /* \ud83c\uddf8 */ us: /\\ud83c\\uddf8/,
                     



 


















                     // Emojis Default Facebook

                     /* :)   */ fb_smile: /:?\)/,
                     /* :(   */ fb_frown: /:-?\(/,
                     /* :P   */ fb_tongue: /[:;]-?p/,
                     /* =D   */ fb_grin: /[=]-?D/,
                     /* :-o  */ fb_gasp: /:o/,
                     /* ;)   */ fb_wink: /;?\)/,
                     /* :v   */ fb_pacman: /[:]-?v/,
                     /* >:(  */ fb_grumpy: /[>][:]-?\(/,
                     /* :/   */ fb_unsure: /:-?\//,
                     /* :'(  */ fb_cry: /[:][']-?\(/,
                     /* B|   */ fb_sunglasses: /[\?B][\?|]/,
                     /* 8-)  */ fb_glasses: /[\?8][\?-][\?)]/,
                     /* <3   */ fb_heart: /<3|&lt;3/,
                     /* 3:)  */ fb_devil: /[\?3][\?:][\?)]/,
                     /* O:)  */ fb_angel: /[\?O][\?:][\?)]/,
                     /* o.O  */ fb_confused: /[o][.][O]/,
                     /* -_-  */ fb_squint: /[\?-][\?_][\?-]/,
                     /* >:o  */ fb_upset: /[>][:][o]/,
                     /* ^_^  */ fb_kiki: /[\\^^][\\_][\\^^]/,
                     /* :3   */ fb_colonthree: /[\?:][\?3]/,
                     /* (y)  */ fb_like: /(\(y\))/
                     
                };

                if (defaultConfig.ignore_emoticons) {
                    emoticons = {
                         /* :..: */ named: /:([a-z0-9A-Z_-]+):/,
                         /* :+1: */ thumbsup: /:\+1:/g,
                         /* :-1: */ thumbsdown: /:\-1:/g
                    };
                }

                return Object.keys(emoticons).map(function(key) {
                    return [emoticons[key], key];
                });
            }

            function initMegaRe() {
                var mega = emoticonsProcessed
                        .map(function(v) {
                            var re = v[0];
                            var val = re.source || re;
                            val = val.replace(/(^|[^\[])\^/g, '$1');
                            return "(" + val + ")";
                        })
                        .join('|');
                return new RegExp(mega, "gi");
            }

            var defaultConfig = {
                blacklist: {
                    'ids': [],
                    'classes': ['no-emojify'],
                    'elements': ['script', 'textarea', 'a', 'pre', 'code']
                },
                tag_type: null,
                only_crawl_id: null,
                img_dir: 'images/basic',
                ignore_emoticons: false,
                mode: 'img'
            };

            function isWhitespace(s) {
                return s === ' ' || s === '\t' || s === '\r' || s === '\n' || s === '' || s === String.fromCharCode(160);
            }

            var modeToElementTagType = {
                'img': 'img',
                'sprite': 'span',
                'data-uri': 'span'
            };

            function insertEmojicon(args) {
                var emojiElement = null;


                if(args.replacer){
                    emojiElement = args.replacer.apply({
                            config: defaultConfig
                        },
                        [':' + args.emojiName + ':', args.emojiName]
                    );
                }
                else {
                    var elementType = defaultConfig.tag_type || modeToElementTagType[defaultConfig.mode];
                    emojiElement = args.win.document.createElement(elementType);

                    if (elementType !== 'img') {
                        emojiElement.setAttribute('class', 'emoji emoji-' + args.emojiName);
                    } else {
                        emojiElement.setAttribute('align', 'absmiddle');
                        emojiElement.setAttribute('alt', ':' + args.emojiName + ':');
                        emojiElement.setAttribute('class', 'emoji');
                        emojiElement.setAttribute('src', defaultConfig.img_dir + '/' + args.emojiName + '.png');
                    }

                    emojiElement.setAttribute('title', ':' + args.emojiName + ':');
                }

                args.node.splitText(args.match.index);
                args.node.nextSibling.nodeValue = args.node.nextSibling.nodeValue.substr(
                    args.match[0].length,
                    args.node.nextSibling.nodeValue.length
                );
                emojiElement.appendChild(args.node.splitText(args.match.index));
                args.node.parentNode.insertBefore(emojiElement, args.node.nextSibling);
            }

            function getEmojiNameForMatch(match) {
                if(match[1] && match[2]) {
                    var named = match[2];
                    if(namedMatchHash[named]) { return named; }
                    return;
                }
                for(var i = 3; i < match.length - 1; i++) {
                    if(match[i]) {
                        return emoticonsProcessed[i - 2][1];
                    }
                }
            }

            function defaultReplacer(emoji, name) {
                var elementType = this.config.tag_type || modeToElementTagType[this.config.mode];
                if (elementType !== 'img') {
                    return "<" +  elementType +" class='emoji emoji-" + name + "' title=':" + name + ":'></" + elementType+ ">";
                } else {
                    return "<img align='absmiddle' alt=':" + name + ":' class='emoji' src='" + this.config.img_dir + '/' + name + ".png' title=':" + name + ":' />";
                }
            }

            function Validator() {
                this.lastEmojiTerminatedAt = -1;
            }

            Validator.prototype = {
                validate: function(match, index, input) {
                    var self = this;

                    var emojiName = getEmojiNameForMatch(match);
                    if(!emojiName) { return; }

                    var m = match[0];
                    var length = m.length;

                    function success() {
                        self.lastEmojiTerminatedAt = length + index;
                        return emojiName;
                    }

                    if(index === 0) { return success(); }

                    if(input.length === m.length + index) { return success(); }

                    var hasEmojiBefore = this.lastEmojiTerminatedAt === index;
                    if (hasEmojiBefore) { return success();}

                    if(isWhitespace(input.charAt(index - 1))) { return success(); }

                    var hasWhitespaceAfter = isWhitespace(input.charAt(m.length + index));
                    if(hasWhitespaceAfter && hasEmojiBefore) { return success(); }

                    return;
                }
            };

            function emojifyString (htmlString, replacer) {
                if(!htmlString) { return htmlString; }
                if(!replacer) { replacer = defaultReplacer; }

                emoticonsProcessed = initEmoticonsProcessed();
                emojiMegaRe = initMegaRe();

                var validator = new Validator();

                return htmlString.replace(emojiMegaRe, function() {
                    var matches = Array.prototype.slice.call(arguments, 0, -2);
                    var index = arguments[arguments.length - 2];
                    var input = arguments[arguments.length - 1];
                    var emojiName = validator.validate(matches, index, input);
                    if(emojiName) {
                        return replacer.apply({
                                config: defaultConfig
                            },
                            [arguments[0], emojiName]
                        );
                    }
                    return arguments[0];
                });

            }
            function run(el, replacer) {

                if(typeof el === 'undefined'){
                    if (defaultConfig.only_crawl_id) {
                        el = document.getElementById(defaultConfig.only_crawl_id);
                    } else {
                        el = document.body;
                    }
                }

                var doc = el.ownerDocument,
                    win = doc.defaultView || doc.parentWindow;

                var treeTraverse = function (parent, cb){
                    var child;

                    if (parent.hasChildNodes()) {
                        child = parent.firstChild;
                        while(child){
                            if(cb(child)) {
                                treeTraverse(child, cb);
                            }
                            child = child.nextSibling;
                        }
                    }
                };

                var matchAndInsertEmoji = function(node) {
                    var match;
                    var matches = [];
                    var validator = new Validator();

                    while ((match = emojiMegaRe.exec(node.data)) !== null) {
                        if(validator.validate(match, match.index, match.input)) {
                            matches.push(match);
                        }
                    }

                    for (var i = matches.length; i-- > 0;) {
                        var emojiName = getEmojiNameForMatch(matches[i]);
                        insertEmojicon({
                            node: node,
                            match: matches[i],
                            emojiName: emojiName,
                            replacer: replacer,
                            win: win
                        });
                    }
                };

                emoticonsProcessed = initEmoticonsProcessed();
                emojiMegaRe = initMegaRe();

                var nodes = [];

                var elementsBlacklist = new RegExp(defaultConfig.blacklist.elements.join('|'), 'i'),
                    classesBlacklist = new RegExp(defaultConfig.blacklist.classes.join('|'), 'i');

                if(typeof win.document.createTreeWalker !== 'undefined') {
                    var nodeIterator = win.document.createTreeWalker(
                        el,
                        win.NodeFilter.SHOW_TEXT | win.NodeFilter.SHOW_ELEMENT,
                        function(node) {
                            if(node.nodeType !== 1) {
                                return win.NodeFilter.FILTER_ACCEPT;
                            }

                            if(node.tagName.match(elementsBlacklist) || node.tagName === "svg" || node.className.match(classesBlacklist)) {
                                return win.NodeFilter.FILTER_REJECT;
                            }

                            return win.NodeFilter.FILTER_SKIP;
                        },
                        false
                    );

                    var node;

                    while((node = nodeIterator.nextNode()) !== null) {
                        nodes.push(node);
                    }
                }
                else {
                    treeTraverse(el, function(node){
                        if(
                            (typeof node.tagName !== 'undefined' && node.tagName.match(elementsBlacklist)) ||
                            (typeof node.className !== 'undefined' && node.className.match(classesBlacklist))
                        ){
                            return false;
                        }
                        if (node.nodeType === 1) {
                            return true;
                        }

                        nodes.push(node);
                        return true;
                    });
                }

                nodes.forEach(matchAndInsertEmoji);
            }

            return {
                defaultConfig: defaultConfig,
                emojiNames: namedEmoji,
                setConfig: function (newConfig) {
                    Object.keys(defaultConfig).forEach(function(f) {
                        if(f in newConfig) {
                            defaultConfig[f] = newConfig[f];
                        }
                    });
                },

                replace: emojifyString,
                run: run
            };
        })();
        return emojify;
    }
));
