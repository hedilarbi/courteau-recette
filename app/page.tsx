"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { type ApiRecipe, fetchRecipes } from "./data/recipes";

// ============================================================
// ICONS
// ============================================================
function IconSearch(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconBack(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function IconWarning(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function IconClose(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconPrinter(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  );
}

const POUTINE_PORTIONS = [
  {
    size: "PETITE POUTINE:",
    lines: ["3/4 CONTENANT DE FROMAGE", "3/4 LOUCHE DE SAUCE"],
  },
  {
    size: "MOYENNE POUTINE:",
    lines: [
      "3/4 LOUCHE DE SAUCE",
      "1 CONTENANT DE FROMAGE",
      "3/4 LOUCHE DE SAUCE",
    ],
  },
  {
    size: "GRANDE POUTINE:",
    lines: [
      "2 LOUCHES DE SAUCE",
      "1 1/2 CONTENANT DE FROMAGE",
      "1 LOUCHE DE SAUCE",
    ],
  },
  {
    size: "FAMILIALE POUTINE:",
    lines: [
      "2 LOUCHES DE SAUCE",
      "2 CONTENANTS DE FROMAGE",
      "2 LOUCHES DE SAUCE",
    ],
  },
  {
    size: "BARIL POUTINE:",
    lines: [
      "1 CONTENANT DE FROMAGE ET 1 1/2",
      "LOUCHE DE SAUCE AU CENTRE",
      "1 1/2 CONTENANT DE FROMAGE ET 2",
      "LOUCHES DE SAUCE SUR LE DESSUS",
    ],
  },
];

function PoutinePortions() {
  return (
    <section className="lc-poutine">
      <header className="lc-poutine-head">
        <span>L E S P O R T I O N S</span>
        <h2>S A U C E E T F R O M A G E</h2>
      </header>

      <div className="lc-poutine-list">
        {POUTINE_PORTIONS.map((portion) => (
          <div className="lc-poutine-row" key={portion.size}>
            <h3>{portion.size}</h3>
            <div>
              {portion.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <strong className="lc-poutine-warning">SAUCE TOUJOURS BIEN MÉLANGÉE!</strong>
    </section>
  );
}

// ============================================================
// LIVE CLOCK
// ============================================================
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return <>{time}</>;
}

// ============================================================
// LOADING SCREEN
// ============================================================
function LoadingScreen() {
  return (
    <div className="lc-loading">
      <div className="lc-loading-spinner" />
      <span>CHARGEMENT</span>
    </div>
  );
}

// ============================================================
// ERROR SCREEN
// ============================================================
function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="lc-loading">
      <div className="lc-empty-mark">!</div>
      <span style={{ color: "var(--danger)", letterSpacing: "0.16em", fontSize: 13 }}>
        ERREUR DE CONNEXION
      </span>
      <button
        onClick={onRetry}
        style={{
          marginTop: 16,
          padding: "10px 24px",
          background: "var(--yellow)",
          color: "var(--black)",
          fontWeight: 800,
          letterSpacing: "0.1em",
          fontSize: 13,
        }}
      >
        RÉESSAYER
      </button>
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({
  query,
  setQuery,
  onLogo,
}: {
  query: string;
  setQuery: (q: string) => void;
  onLogo: () => void;
}) {
  return (
    <header className="lc-header">
      <button className="lc-logo" onClick={onLogo}>
        <Image
          src="/logo.png"
          alt="Casse-Croûte Courteau"
          width={200}
          height={83}
          style={{ height: 52, width: "auto" }}
          priority
        />
      </button>

      <div className="lc-search">
        <IconSearch width="20" height="20" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un plat, un ingrédient, une catégorie…"
        />
        {query && (
          <button className="lc-search-clear" onClick={() => setQuery("")} aria-label="Effacer">
            <IconClose width="16" height="16" />
          </button>
        )}
      </div>

      <div className="lc-status">
        <div className="lc-status-row">
          <span className="lc-status-dot" />
          <span>SERVICE</span>
        </div>
        <div className="lc-status-time">
          <LiveClock />
        </div>
      </div>
    </header>
  );
}

// ============================================================
// CATEGORY BAR
// ============================================================
function CategoryBar({
  active,
  setActive,
  counts,
  categories,
}: {
  active: string;
  setActive: (c: string) => void;
  counts: Record<string, number>;
  categories: string[];
}) {
  return (
    <nav className="lc-catbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={"lc-cat" + (active === cat ? " is-active" : "")}
        >
          <span className="lc-cat-name">{cat}</span>
          <span className="lc-cat-count">{counts[cat] ?? 0}</span>
        </button>
      ))}
    </nav>
  );
}

// ============================================================
// RECIPE CARD
// ============================================================
function RecipeCard({ recipe, onOpen }: { recipe: ApiRecipe; onOpen: (id: string) => void }) {
  return (
    <button className="lc-card" onClick={() => onOpen(recipe._id)}>
      <div className="lc-card-image">
        {recipe.item?.image ? (
          <Image
            src={recipe.item.image}
            alt={recipe.item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            unoptimized
          />
        ) : (
          <div className="lc-card-image-placeholder" />
        )}
      </div>
      <div className="lc-card-body">
        <div className="lc-card-cat">{recipe.category?.name}</div>
        <div className="lc-card-name">{recipe.item?.name}</div>
        <div className="lc-card-meta">
          <span className="lc-card-meta-num">{recipe.ingredients?.length ?? 0}</span>
          <span className="lc-card-meta-lbl">ingrédients</span>
        </div>
      </div>
    </button>
  );
}

// ============================================================
// LIST PAGE
// ============================================================
function ListPage({ recipes, onOpen }: { recipes: ApiRecipe[]; onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Tout");

  const categories = useMemo(() => {
    const names = Array.from(new Set(recipes.map((r) => r.category?.name).filter(Boolean)));
    return ["Tout", ...names];
  }, [recipes]);

  const filtered = useMemo(() => {
    let arr = recipes;
    if (active !== "Tout") arr = arr.filter((r) => r.category?.name === active);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (r) =>
          r.item?.name?.toLowerCase().includes(q) ||
          r.category?.name?.toLowerCase().includes(q) ||
          r.ingredients?.some((ing) => ing.toLowerCase().includes(q))
      );
    }
    return arr;
  }, [query, active, recipes]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { Tout: recipes.length };
    for (const r of recipes) {
      const cat = r.category?.name;
      if (cat) c[cat] = (c[cat] || 0) + 1;
    }
    return c;
  }, [recipes]);

  const grouped = useMemo(() => {
    if (active !== "Tout") return null;
    const map: Record<string, ApiRecipe[]> = {};
    for (const r of filtered) {
      const cat = r.category?.name ?? "Autres";
      if (!map[cat]) map[cat] = [];
      map[cat].push(r);
    }
    return map;
  }, [active, filtered]);

  return (
    <div className="lc-app">
      <Header
        query={query}
        setQuery={(q) => { setQuery(q); if (q) setActive("Tout"); }}
        onLogo={() => { setQuery(""); setActive("Tout"); }}
      />
      <CategoryBar
        active={active}
        setActive={setActive}
        counts={counts}
        categories={categories}
      />

      <main className="lc-main">
        <div className="lc-toolbar">
          <div className="lc-toolbar-left">
            <h1 className="lc-h1">{active === "Tout" ? "Livre de recettes" : active}</h1>
            <div className="lc-toolbar-meta">
              <span className="lc-pill">
                {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
              </span>
              {query && <span className="lc-pill lc-pill-alt">« {query} »</span>}
            </div>
          </div>
          <div className="lc-toolbar-right">
            <div className="lc-legend">
              <span className="lc-legend-key">↑</span>
              <span>priorité d&apos;affichage des ingrédients</span>
            </div>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="lc-empty">
            <div className="lc-empty-mark">∅</div>
            <div className="lc-empty-title">Aucune recette</div>
            <div className="lc-empty-sub">Essaye un autre terme ou change de catégorie.</div>
          </div>
        )}

        {grouped ? (
          Object.keys(grouped).map((cat) => (
            <section key={cat} className="lc-section">
              <header className="lc-section-head">
                <span className="lc-section-tick" />
                <h2 className="lc-section-title">{cat}</h2>
                <span className="lc-section-count">{grouped[cat].length}</span>
                <button className="lc-section-more" onClick={() => setActive(cat)}>
                  Voir tout →
                </button>
              </header>
              <div className="lc-grid">
                {grouped[cat].map((r) => (
                  <RecipeCard key={r._id} recipe={r} onOpen={onOpen} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="lc-grid">
            {filtered.map((r) => (
              <RecipeCard key={r._id} recipe={r} onOpen={onOpen} />
            ))}
          </div>
        )}
      </main>

      <footer className="lc-foot">
        <span>LE COURTEAU · DOC INTERNE CUISINE</span>
        <span>{recipes.length} recette{recipes.length !== 1 ? "s" : ""} · MAJ EN DIRECT</span>
      </footer>
    </div>
  );
}

// ============================================================
// DETAIL PAGE
// ============================================================
function DetailPage({ recipe, onBack }: { recipe: ApiRecipe; onBack: () => void }) {
  const isPoutine = recipe.category?.name?.toLowerCase().includes("poutine");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recipe._id]);

  return (
    <div className="lc-detail">
      <div className="lc-detail-bar">
        <button className="lc-back" onClick={onBack}>
          <IconBack width="20" height="20" />
          <span>Retour</span>
        </button>
        <div className="lc-detail-breadcrumb">
          <span className="lc-bc-dim">RECETTES</span>
          <span className="lc-bc-sep">/</span>
          <span className="lc-bc-dim">{recipe.category?.name?.toUpperCase()}</span>
          <span className="lc-bc-sep">/</span>
          <span className="lc-bc-strong">{recipe.item?.name}</span>
        </div>
        <div className="lc-detail-actions">
          <button className="lc-iconbtn" title="Imprimer (fiche cuisine)" onClick={() => window.print()}>
            <IconPrinter width="18" height="18" />
          </button>
        </div>
      </div>

      <article className="lc-article">
        <div className="lc-article-left">
          <div className="lc-hero">
            {recipe.item?.image ? (
              <Image
                src={recipe.item.image}
                alt={recipe.item.name}
                fill
                sizes="(max-width: 980px) 100vw, 520px"
                style={{ objectFit: "cover" }}
                unoptimized
                priority
              />
            ) : (
              <div className="lc-hero-placeholder" />
            )}
          </div>
        </div>

        <div className="lc-article-right">
          <div className="lc-article-head">
            <div className="lc-article-cat">{recipe.category?.name}</div>
            <h1 className="lc-article-title">{recipe.item?.name}</h1>
          </div>

          {recipe.instruction && (
            <div className="lc-consigne">
              <div className="lc-consigne-stripe" />
              <div className="lc-consigne-body">
                <div className="lc-consigne-head">
                  <IconWarning width="22" height="22" />
                  <span className="lc-consigne-label">Consigne</span>
                  <span className="lc-consigne-tag">À LIRE AVANT EXÉCUTION</span>
                </div>
                <p className="lc-consigne-text">{recipe.instruction}</p>
              </div>
            </div>
          )}

          {isPoutine && <PoutinePortions />}

          <section className="lc-ingredients">
            <header className="lc-ing-head">
              <h2 className="lc-ing-title">Ingrédients</h2>
              <div className="lc-ing-meta">
                <span className="lc-ing-meta-num">{recipe.ingredients?.length ?? 0}</span>
                <span className="lc-ing-meta-lbl">items </span>
              </div>
            </header>

            {recipe.ingredients?.length > 0 ? (
              <ol className="lc-ing-list">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="lc-ing-row">
                    <span className="lc-ing-rank">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="lc-ing-name">{ing}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <div style={{ padding: "24px 22px", color: "var(--muted)", fontStyle: "italic" }}>
                Aucun ingrédient renseigné.
              </div>
            )}
          </section>
        </div>
      </article>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
type View = { name: "list" } | { name: "detail"; id: string };

export default function Page() {
  const [view, setView] = useState<View>({ name: "list" });
  const [recipes, setRecipes] = useState<ApiRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const load = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchRecipes()
      .then((data) => {
        if (!isMounted) return;
        setRecipes(data);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const open = useCallback((id: string) => setView({ name: "detail", id }), []);
  const back = useCallback(() => setView({ name: "list" }), []);

  const selectedRecipe = view.name === "detail"
    ? recipes.find((r) => r._id === view.id) ?? null
    : null;

  if (isLoading) return <LoadingScreen />;
  if (hasError) return <ErrorScreen onRetry={load} />;

  return (
    <>
      {view.name === "list" && <ListPage recipes={recipes} onOpen={open} />}
      {view.name === "detail" && selectedRecipe && (
        <DetailPage recipe={selectedRecipe} onBack={back} />
      )}
      {view.name === "detail" && !selectedRecipe && (
        <ListPage recipes={recipes} onOpen={open} />
      )}
    </>
  );
}
