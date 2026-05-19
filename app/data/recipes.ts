export type ApiRecipe = {
  _id: string;
  item: {
    _id: string;
    name: string;
    image: string | null;
  };
  category: {
    _id: string;
    name: string;
  };
  ingredients: string[];
  instruction: string;
};

// ─── Recettes statiques (plats absents du menu API) ───────────────────────────
const STATIC_RECIPES: ApiRecipe[] = [
  {
    _id: "static-movember",
    item: {
      _id: "static-item-movember",
      name: "Movember",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/1697649245090.jpeg?alt=media&token=f99b56f7-54e4-4024-8e95-5013c6ece228",
    },
    category: { _id: "static-cat-autre-poutine", name: "Autre Poutine" },
    ingredients: ["Chair de saucisse", "Bacon", "Oignons cuits", "Sauce bbq fumée"],
    instruction: "",
  },
  {
    _id: "static-cotes-levees",
    item: {
      _id: "static-item-cotes-levees",
      name: "CÔTES LEVÉES",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/coteleve.png?alt=media&token=e8ff0e1a-e75a-4222-970c-72e7b4380075",
    },
    category: { _id: "static-cat-autre-poutine", name: "Autre Poutine" },
    ingredients: ["Côtes levées dans sa sauce"],
    instruction: "",
  },
  {
    _id: "static-soupe-oignon",
    item: {
      _id: "static-item-soupe-oignon",
      name: "SOUPE À L'OIGNON",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/soupe.png?alt=media&token=4aa0037f-7bbf-44c3-90e5-717ebc0280a8",
    },
    category: { _id: "static-cat-autre-poutine", name: "Autre Poutine" },
    ingredients: [
      "Mélange à l'oignon",
      "Tranche de pain en morceaux — Moyenne : 1 tranche / Grande : 2 tranches / Familiale : 2 tranches",
      "Fromage râpé",
      "Mettre 3 min 30 au four pizza",
    ],
    instruction: "",
  },
  {
    _id: "static-macn-meat",
    item: {
      _id: "static-item-macn-meat",
      name: "MAC'N MEAT",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%206.45.39%E2%80%AFPM.png?alt=media&token=b0a5eddc-4deb-4809-b12c-f138c94d005e",
    },
    category: { _id: "static-cat-pizzas", name: "Pizzas" },
    ingredients: [
      "Sauce",
      "Pepperoni",
      "Fromage",
      "Ajouter après cuisson — Saucisses hot dog en morceaux cuits",
      "Bacon",
      "Croquettes de mac'n cheese — Bambino : 2 / Petite : 4 / Moyenne : 6 / Large : 8 / X Large : 10",
    ],
    instruction: "Toujours une pâte à pizza régulière en base",
  },
  {
    _id: "static-desro",
    item: {
      _id: "static-item-desro",
      name: "DESRO",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%206.51.11%E2%80%AFPM.png?alt=media&token=32bd5b29-2085-4406-904a-a09921a19a56",
    },
    category: { _id: "static-cat-pizzas", name: "Pizzas" },
    ingredients: [
      "Sauce",
      "Poivrons",
      "Oignons",
      "Fromage",
      "Ajouter après cuisson — Poulet desro",
      "Sauce thaï",
      "Oignons verts",
      "Graines de sésames",
    ],
    instruction: "Toujours une pâte à pizza régulière en base",
  },
  {
    _id: "static-gyros",
    item: {
      _id: "static-item-gyros",
      name: "GYROS",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%206.54.17%E2%80%AFPM.png?alt=media&token=b7d1610e-6e7e-404d-85cf-dd83bf05ded1",
    },
    category: { _id: "static-cat-wraps", name: "Wraps & Pitas" },
    ingredients: [
      "Sauce tzatziki",
      "Salade",
      "Tomate",
      "Oignons rouge",
      "4 tranches poulet gyros",
    ],
    instruction: "",
  },
  {
    _id: "static-du-chef",
    item: {
      _id: "static-item-du-chef",
      name: "DU CHEF",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%206.56.39%E2%80%AFPM.png?alt=media&token=dc567806-917a-4d75-952a-2f9a532ff437",
    },
    category: { _id: "static-cat-casse-croute", name: "Casse-Croûte" },
    ingredients: [
      "Pain",
      "Sauce bbq fumée",
      "Salade",
      "Tomate",
      "Cornichons",
      "Fromage blanc",
      "Boulette",
      "Bacon",
      "Sauce bbq fumée",
      "Pain",
    ],
    instruction: "Avec pain régulier",
  },
  {
    _id: "static-ranch-bacon",
    item: {
      _id: "static-item-ranch-bacon",
      name: "RANCH BACON",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%206.59.50%E2%80%AFPM.png?alt=media&token=27d7b43b-033b-4054-8402-e3618abd13e8",
    },
    category: { _id: "static-cat-casse-croute", name: "Casse-Croûte" },
    ingredients: [
      "Pain",
      "Sauce ranch",
      "Salade",
      "Cornichons",
      "Fromage blanc",
      "Poulet",
      "Bacon",
      "Sauce ranch",
      "Pain",
    ],
    instruction: "",
  },
  {
    _id: "static-jelly-peanut",
    item: {
      _id: "static-item-jelly-peanut",
      name: "JELLY-PEANUT",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lecourteau-19bdb.appspot.com/o/Screenshot%202026-05-18%20at%207.02.39%E2%80%AFPM.png?alt=media&token=e21fbb99-1b78-4eb4-9dc8-cfd1f57926c7",
    },
    category: { _id: "static-cat-casse-croute", name: "Casse-Croûte" },
    ingredients: [
      "Pain",
      "Confiture de fraise",
      "Bacon",
      "Fromage blanc",
      "Viande",
      "Beurre d'arachide",
      "Pain",
    ],
    instruction: "",
  },
];

// ─── Fusion API + statique ─────────────────────────────────────────────────────
// Si une catégorie statique correspond (insensible à la casse) à une catégorie
// existante dans l'API, on adopte le nom exact de l'API pour regrouper ensemble.
function mergeWithStatic(apiRecipes: ApiRecipe[]): ApiRecipe[] {
  const apiCategoryNames = Array.from(
    new Set(apiRecipes.map((r) => r.category?.name).filter(Boolean))
  );

  const resolved = STATIC_RECIPES.map((recipe) => {
    const staticCatLower = recipe.category.name.toLowerCase();
    const match = apiCategoryNames.find(
      (name) => name.toLowerCase() === staticCatLower
    );
    if (match) {
      return {
        ...recipe,
        category: { ...recipe.category, name: match },
      };
    }
    return recipe;
  });

  return [...apiRecipes, ...resolved];
}

// ─── Fetch principal ───────────────────────────────────────────────────────────
export const fetchRecipes = async (): Promise<ApiRecipe[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return mergeWithStatic([]);
  try {
    const res = await fetch(`${apiUrl}/recipes`, { cache: "no-store" });
    if (!res.ok) return mergeWithStatic([]);
    const apiRecipes: ApiRecipe[] = await res.json();
    return mergeWithStatic(apiRecipes);
  } catch {
    return mergeWithStatic([]);
  }
};
