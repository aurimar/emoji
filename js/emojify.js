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
                    /* \ud83d\ude02 */ joy: /\\ud83d\\ude02/, 
                    /* \ud83d\ude07 */ innocent: /\\ud83d\\ude07/, 
                    /* \u263a\ufe0f */ relaxed: /\\u263a\\ufe0f/, 
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
