"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app")); // Assure-toi que le chemin vers `app` est correct
describe('POST /api/justify', () => {
    let token;
    // Avant tout, génère un token à utiliser pour l'authentification
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/token')
            .send({ email: 'tiojioromain02@gmail.com' });
        expect(response.status).toBe(200);
        token = response.body.token; // Stocke le token généré
        expect(token).toBeDefined();
    }));
    it('should justify text and return 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour';
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/justify')
            .set('Authorization', `Bearer ${token}`) // Utilise le token généré
            .send({ text });
        expect(response.status).toBe(200);
        expect(response.text).toBeDefined();
        const lines = response.text.split('\n');
        lines.forEach(line => {
            expect(line).toHaveLength(80);
        }); // Vérifie si le texte est justifié sur 80 caractères
        console.log(text);
        console.log(response.text);
    }));
    it('should return 402 if daily word limit is exceeded', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simuler un dépassement de la limite de 80 000 mots
        const largeText = 'cfgchgvhvhgvhgjbhjbjhbgjhgv';
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/justify')
            .set('Authorization', `Bearer ${token}`) // Utilise le token généré
            .send({ text: largeText });
        expect(response.text).toBe('Payment Required: daily word limit exceeded');
        expect(response.status).toBe(402); // Vérifie qu'une erreur 402 est renvoyée
    }));
    it('should return 401 if token is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'Lorem ipsum '.repeat(8); // Exemple de texte à justifier
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/justify')
            .send({ text });
        expect(response.status).toBe(401); // Vérifie qu'une erreur 401 est renvoyée si le token est absent
        expect(response.text).toBe('Access denied. No token provided.');
        console.log(response.text);
    }));
});
