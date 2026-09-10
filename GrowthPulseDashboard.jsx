import React, { useState } from "react";

const TITLES = {
  overview: "Executive Overview",
  root: "Root Cause Analysis",
  competitors: "Competitor Comparison",
  actions: "Prioritized Action Plan",
  roadmap: "30-Day Optimization Roadmap",
  product: "Optimized Product Listing",
};

const NAV_ITEMS = [
  { key: "overview", icon: "◉", label: "Overview" },
  { key: "root", icon: "⌁", label: "Root Cause" },
  { key: "competitors", icon: "▦", label: "Competitors" },
  { key: "actions", icon: "✓", label: "Action Plan" },
  { key: "roadmap", icon: "◷", label: "30-Day Roadmap" },
  { key: "product", icon: "▣", label: "Product Listing" },
];

const CSS = `
:root{
  --bg:#f5f7fb;--card:#fff;--text:#172033;--muted:#697386;--line:#e7eaf0;
  --primary:#5b5ce2;--primary2:#7c5cff;--green:#159a68;--red:#dc4c64;--amber:#c27a00;
  --shadow:0 8px 28px rgba(26,35,56,.07);--radius:18px
}
.gp-root *{box-sizing:border-box}
.gp-root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:var(--bg);color:var(--text)}
.gp-root button{font:inherit}
.gp-app{display:flex;min-height:100vh}
.gp-sidebar{width:245px;background:#12172a;color:#dce1f2;padding:22px 14px;position:fixed;inset:0 auto 0 0}
.gp-logo{font-size:21px;font-weight:800;padding:10px 12px 24px;color:#fff}
.gp-logo span{color:#8e90ff}
.gp-nav{display:grid;gap:6px}
.gp-nav button{border:0;background:transparent;color:#aeb6cf;text-align:left;padding:12px 13px;border-radius:11px;cursor:pointer}
.gp-nav button.active,.gp-nav button:hover{background:#242b46;color:#fff}
.gp-side-note{position:absolute;left:18px;right:18px;bottom:20px;padding:14px;border:1px solid #303853;border-radius:13px;font-size:12px;color:#9fa8c2}
.gp-main{margin-left:245px;width:calc(100% - 245px);padding:28px 32px}
.gp-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.gp-eyebrow{color:var(--primary);font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.gp-title{font-size:30px;margin:4px 0;font-weight:800}
.gp-sub{color:var(--muted);font-size:14px}
.gp-btn{border:1px solid var(--line);background:#fff;padding:10px 14px;border-radius:10px;cursor:pointer}
.gp-btn.primary{background:var(--primary);border-color:var(--primary);color:#fff}
.gp-page{display:none}
.gp-page.active{display:block}
.gp-grid{display:grid;gap:16px}
.gp-kpis{grid-template-columns:repeat(4,1fr)}
.gp-card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:20px}
.gp-kpi-label{color:var(--muted);font-size:13px}
.gp-kpi{font-size:28px;font-weight:800;margin:8px 0}
.gp-kpi.down{color:var(--red)}
.gp-delta{font-size:12px;font-weight:700}
.gp-delta.down{color:var(--red)}
.gp-delta.up{color:var(--green)}
.gp-delta.neutral{color:var(--amber)}
.gp-two{grid-template-columns:1.35fr .9fr;margin-top:16px}
.gp-three{grid-template-columns:repeat(3,1fr);margin-top:16px}
.gp-section-title{font-size:17px;font-weight:800;margin:0 0 14px}
.gp-chart{height:260px;display:flex;align-items:end;gap:9px;padding:18px 4px 4px}
.gp-bar-wrap{height:100%;flex:1;display:flex;align-items:end;gap:4px}
.gp-bar{width:50%;border-radius:7px 7px 2px 2px;background:linear-gradient(180deg,#7779ef,#5b5ce2)}
.gp-bar.alt{background:#dfe1ff}
.gp-axis{display:flex;justify-content:space-between;color:var(--muted);font-size:11px}
.gp-donut{width:160px;height:160px;border-radius:50%;background:conic-gradient(var(--primary) 0 55%,#a8a9f8 55% 78%,#dfe1ff 78%);margin:10px auto;position:relative}
.gp-donut:after{content:"";position:absolute;inset:32px;background:#fff;border-radius:50%}
.gp-legend{display:grid;gap:8px;font-size:12px}
.gp-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;background:var(--primary)}
.gp-dot.b{background:#a8a9f8}
.gp-dot.c{background:#dfe1ff}
.gp-alert{padding:13px 14px;border-radius:12px;background:#fff5f6;border:1px solid #ffd8de;color:#8d3041;font-size:13px}
.gp-alert.success{background:#eefaf5;border-color:#cceee0;color:#17694c}
.gp-table{width:100%;border-collapse:collapse;font-size:13px}
.gp-table th,.gp-table td{padding:12px 8px;border-bottom:1px solid var(--line);text-align:left}
.gp-table th{color:var(--muted);font-size:11px;text-transform:uppercase}
.gp-badge{padding:5px 8px;border-radius:999px;font-size:11px;font-weight:700}
.gp-badge.high{background:#fff0f2;color:#bd314b}
.gp-badge.med{background:#fff7e7;color:#9b6200}
.gp-badge.low{background:#edf8f3;color:#187151}
.gp-progress{height:8px;background:#edf0f5;border-radius:9px;overflow:hidden}
.gp-progress i{display:block;height:100%;background:var(--primary);border-radius:9px}
.gp-roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.gp-week{border:1px solid var(--line);border-radius:14px;padding:15px}
.gp-week h4{margin:0 0 8px}
.gp-week ul{margin:0;padding-left:18px;color:var(--muted);font-size:12px;line-height:1.7}
.gp-product{display:grid;grid-template-columns:170px 1fr;gap:20px}
.gp-product-img{height:190px;border-radius:15px;background:linear-gradient(145deg,#ececff,#cfd1ff);display:flex;align-items:center;justify-content:center;font-size:70px}
.gp-price{font-size:26px;font-weight:800}
.gp-old{text-decoration:line-through;color:var(--muted);font-size:14px;margin-left:7px}
.gp-chips{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}
.gp-chip{background:#f0f1ff;color:#4f51bf;padding:6px 9px;border-radius:8px;font-size:11px;font-weight:700}
.gp-checklist{display:grid;grid-template-columns:1fr 1fr;gap:9px;font-size:13px}
.gp-check{padding:11px;border:1px solid var(--line);border-radius:10px}
.gp-check b{color:var(--green)}
.gp-priority{display:grid;gap:10px}
.gp-priority-item{display:grid;grid-template-columns:75px 1fr 70px;align-items:center;gap:10px;font-size:12px}
.gp-priority-item strong{font-size:12px}
.gp-menu-toggle{display:none}
.gp-sidebar-overlay{display:none}

@media(max-width:1000px){
  .gp-sidebar{width:72px}
  .gp-logo{font-size:0}
  .gp-logo:after{content:"GP";font-size:18px}
  .gp-nav button .gp-nav-label{display:none}
  .gp-nav button{font-size:0;text-align:center}
  .gp-nav button:before{content:"•";font-size:20px}
  .gp-main{margin-left:72px;width:calc(100% - 72px)}
  .gp-kpis{grid-template-columns:repeat(2,1fr)}
  .gp-two,.gp-three,.gp-roadmap{grid-template-columns:1fr}
  .gp-product{grid-template-columns:1fr}
}

@media(max-width:700px){
  .gp-sidebar{
    width:250px;
    transform:translateX(-100%);
    transition:transform .25s ease;
    z-index:40;
    box-shadow:0 0 0 rgba(0,0,0,0);
  }
  .gp-sidebar.open{transform:translateX(0);box-shadow:14px 0 40px rgba(0,0,0,.25)}
  .gp-logo{font-size:21px}
  .gp-logo:after{content:""}
  .gp-nav button{font-size:14px;text-align:left}
  .gp-nav button:before{content:"";font-size:inherit}
  .gp-nav button .gp-nav-label{display:inline}
  .gp-main{margin-left:0;width:100%}
  .gp-menu-toggle{
    display:inline-flex;align-items:center;justify-content:center;
    width:40px;height:40px;border-radius:10px;border:1px solid var(--line);
    background:#fff;cursor:pointer;flex:none;font-size:18px
  }
  .gp-top{flex-wrap:wrap}
  .gp-top-left{display:flex;align-items:flex-start;gap:12px}
  .gp-sidebar-overlay{
    display:block;position:fixed;inset:0;background:rgba(10,13,26,.45);
    z-index:30;opacity:0;pointer-events:none;transition:opacity .2s ease
  }
  .gp-sidebar-overlay.open{opacity:1;pointer-events:auto}
}

@media(max-width:650px){
  .gp-main{padding:16px 12px}
  .gp-top{align-items:flex-start;gap:10px}
  .gp-title{font-size:21px}
  .gp-kpis{grid-template-columns:1fr}
  .gp-checklist{grid-template-columns:1fr}
  .gp-card{padding:16px}
  .gp-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .gp-table{min-width:560px}
  .gp-priority-item{grid-template-columns:1fr;gap:6px}
  .gp-priority-item .gp-badge{justify-self:start}
  .gp-donut{width:130px;height:130px}
  .gp-chart{height:200px}
  .gp-btn{padding:10px 12px;font-size:13px}
}
`;

export default function GrowthPulseDashboard() {
  const [page, setPage] = useState("overview");
  const [navOpen, setNavOpen] = useState(false);

  const goTo = (key) => {
    setPage(key);
    setNavOpen(false);
  };

  return (
    <div className="gp-root">
      <style>{CSS}</style>
      <div className="gp-app">
        <div
          className={`gp-sidebar-overlay${navOpen ? " open" : ""}`}
          onClick={() => setNavOpen(false)}
        />
        <aside className={`gp-sidebar${navOpen ? " open" : ""}`}>
          <div className="gp-logo">
            Growth<span>Pulse</span>
          </div>
          <nav className="gp-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                className={page === item.key ? "active" : ""}
                onClick={() => goTo(item.key)}
              >
                {item.icon} &nbsp;
                <span className="gp-nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="gp-side-note">
            Assignment-ready demo dashboard
            <br />
            <br />
            Scenario: traffic is growing while conversion, add-to-cart and
            inventory health are declining.
          </div>
        </aside>

        <main className="gp-main">
          <header className="gp-top">
            <div className="gp-top-left">
              <button
                className="gp-menu-toggle"
                onClick={() => setNavOpen(true)}
                aria-label="Open navigation menu"
              >
                ☰
              </button>
              <div>
                <div className="gp-eyebrow">
                  E-Commerce Performance & Growth
                </div>
                <div className="gp-title">{TITLES[page]}</div>
                <div className="gp-sub">
                  Decision dashboard • Updated for assignment scenario
                </div>
              </div>
            </div>
            <div>
              <button className="gp-btn" onClick={() => window.print()}>
                Export / Print
              </button>
            </div>
          </header>

          {page === "overview" && (
            <section className="gp-page active">
              <div className="gp-grid gp-kpis">
                <div className="gp-card">
                  <div className="gp-kpi-label">Traffic</div>
                  <div className="gp-kpi">+35%</div>
                  <div className="gp-delta up">▲ Acquisition is healthy</div>
                </div>
                <div className="gp-card">
                  <div className="gp-kpi-label">Product-page views</div>
                  <div className="gp-kpi">+42%</div>
                  <div className="gp-delta up">▲ Stronger product discovery</div>
                </div>
                <div className="gp-card">
                  <div className="gp-kpi-label">Add-to-cart rate</div>
                  <div className="gp-kpi">−18%</div>
                  <div className="gp-delta down">▼ Critical conversion leak</div>
                </div>
                <div className="gp-card">
                  <div className="gp-kpi-label">Conversion rate</div>
                  <div className="gp-kpi">−25%</div>
                  <div className="gp-delta down">▼ Highest-priority KPI</div>
                </div>
              </div>

              <div className="gp-grid gp-two">
                <div className="gp-card">
                  <h3 className="gp-section-title">
                    Funnel trend — indexed performance
                  </h3>
                  <div className="gp-chart">
                    {[
                      [72, 82],
                      [80, 92],
                      [56, 76],
                      [43, 70],
                      [35, 65],
                    ].map(([a, b], i) => (
                      <div className="gp-bar-wrap" key={i}>
                        <div className="gp-bar" style={{ height: `${a}%` }} />
                        <div className="gp-bar alt" style={{ height: `${b}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="gp-axis">
                    <span>Traffic</span>
                    <span>Views</span>
                    <span>ATC</span>
                    <span>Checkout</span>
                    <span>Orders</span>
                  </div>
                  <div className="gp-sub" style={{ marginTop: 12 }}>
                    Current performance vs. target-state index. The key issue
                    is that demand is reaching product pages but intent is
                    not translating into carts and orders.
                  </div>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Issue mix</h3>
                  <div className="gp-donut" />
                  <div className="gp-legend">
                    <div>
                      <span className="gp-dot" />
                      Product content & presentation — 55%
                    </div>
                    <div>
                      <span className="gp-dot b" />
                      Pricing & trust — 23%
                    </div>
                    <div>
                      <span className="gp-dot c" />
                      Inventory & operations — 22%
                    </div>
                  </div>
                </div>
              </div>

              <div className="gp-grid gp-three">
                <div className="gp-card">
                  <h3 className="gp-section-title">Returns</h3>
                  <div className="gp-kpi">+15%</div>
                  <div className="gp-alert">
                    Likely signal of expectation mismatch, product
                    information gaps or quality issues.
                  </div>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Stock-outs</h3>
                  <div className="gp-kpi down">Increasing</div>
                  <div className="gp-alert">
                    Availability friction can suppress conversion even when
                    traffic is strong.
                  </div>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Competitive pressure</h3>
                  <div className="gp-kpi">High</div>
                  <div className="gp-alert">
                    Competitors have better pricing, reviews and product
                    presentation.
                  </div>
                </div>
              </div>
            </section>
          )}

          {page === "root" && (
            <section className="gp-page active">
              <div className="gp-grid gp-two">
                <div className="gp-card">
                  <h3 className="gp-section-title">Root-cause analysis</h3>
                  <div className="gp-table-wrap">
                  <table className="gp-table">
                    <tbody>
                      <tr>
                        <th>Symptom</th>
                        <th>Most probable cause</th>
                        <th>Impact</th>
                      </tr>
                      <tr>
                        <td>ATC −18%</td>
                        <td>
                          Weak value communication, images, price
                          competitiveness or missing trust signals.
                        </td>
                        <td>
                          <span className="gp-badge high">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Conversion −25%</td>
                        <td>
                          Product-page friction compounds with pricing,
                          reviews and stock availability.
                        </td>
                        <td>
                          <span className="gp-badge high">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Returns +15%</td>
                        <td>
                          Expectation mismatch caused by incomplete
                          specifications, imagery or sizing/fit details.
                        </td>
                        <td>
                          <span className="gp-badge high">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Stock-outs</td>
                        <td>
                          Demand is growing faster than replenishment and
                          inventory controls.
                        </td>
                        <td>
                          <span className="gp-badge med">Medium</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Competitive gap</td>
                        <td>
                          Rivals win on price, social proof and presentation.
                        </td>
                        <td>
                          <span className="gp-badge high">High</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Diagnosis logic</h3>
                  <div className="gp-alert success">
                    Traffic +35% and product views +42% indicate
                    acquisition/discovery are not the primary bottleneck.
                  </div>
                  <div style={{ height: 10 }} />
                  <div className="gp-alert">
                    The fall in ATC and conversion points downstream to
                    product-page value, trust, pricing, availability and
                    purchase friction.
                  </div>
                  <div style={{ height: 10 }} />
                  <div className="gp-alert">
                    Returns rising alongside competitive presentation gaps
                    makes content accuracy and expectation-setting a
                    priority.
                  </div>
                </div>
              </div>
            </section>
          )}

          {page === "competitors" && (
            <section className="gp-page active">
              <div className="gp-card">
                <h3 className="gp-section-title">
                  Competitor / listing comparison
                </h3>
                <div className="gp-table-wrap">
                <table className="gp-table">
                  <tbody>
                    <tr>
                      <th>Dimension</th>
                      <th>Our store</th>
                      <th>Competitor A</th>
                      <th>Competitor B</th>
                      <th>Priority</th>
                    </tr>
                    <tr>
                      <td>Pricing</td>
                      <td>Less competitive</td>
                      <td>Strong value</td>
                      <td>Frequent offers</td>
                      <td>
                        <span className="gp-badge high">High</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Reviews</td>
                      <td>Lower trust volume</td>
                      <td>Strong social proof</td>
                      <td>Strong social proof</td>
                      <td>
                        <span className="gp-badge high">High</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Images</td>
                      <td>Basic / inconsistent</td>
                      <td>Rich gallery</td>
                      <td>Rich gallery</td>
                      <td>
                        <span className="gp-badge high">High</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Descriptions</td>
                      <td>Inconsistent</td>
                      <td>Benefit-led</td>
                      <td>Benefit-led</td>
                      <td>
                        <span className="gp-badge med">Medium</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Inventory</td>
                      <td>Stock-outs increasing</td>
                      <td>More stable</td>
                      <td>More stable</td>
                      <td>
                        <span className="gp-badge high">High</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div className="gp-grid gp-three">
                <div className="gp-card">
                  <h3 className="gp-section-title">Win condition #1</h3>
                  <p className="gp-sub">
                    Make the product page clearer and more trustworthy before
                    increasing acquisition spend.
                  </p>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Win condition #2</h3>
                  <p className="gp-sub">
                    Close the pricing/value gap on high-traffic products.
                  </p>
                </div>
                <div className="gp-card">
                  <h3 className="gp-section-title">Win condition #3</h3>
                  <p className="gp-sub">
                    Reduce stock-outs on the SKUs receiving the most demand.
                  </p>
                </div>
              </div>
            </section>
          )}

          {page === "actions" && (
            <section className="gp-page active">
              <div className="gp-card">
                <h3 className="gp-section-title">
                  Prioritized action plan — impact vs effort
                </h3>
                <div className="gp-priority">
                  <div className="gp-priority-item">
                    <strong>P0 · Fix</strong>
                    <span>
                      <b>Refresh top 20 product pages:</b> titles, benefits,
                      specs, images, trust signals and CTAs.
                    </span>
                    <span className="gp-badge high">High</span>
                  </div>
                  <div className="gp-progress">
                    <i style={{ width: "95%" }} />
                  </div>
                  <div className="gp-priority-item">
                    <strong>P0 · Fix</strong>
                    <span>
                      <b>Inventory controls:</b> stock alerts, reorder
                      thresholds and top-SKU availability review.
                    </span>
                    <span className="gp-badge high">High</span>
                  </div>
                  <div className="gp-progress">
                    <i style={{ width: "90%" }} />
                  </div>
                  <div className="gp-priority-item">
                    <strong>P1 · Test</strong>
                    <span>
                      <b>Pricing experiments:</b> compare price/value
                      positioning on high-traffic SKUs.
                    </span>
                    <span className="gp-badge med">Medium</span>
                  </div>
                  <div className="gp-progress">
                    <i style={{ width: "72%" }} />
                  </div>
                  <div className="gp-priority-item">
                    <strong>P1 · Build</strong>
                    <span>
                      <b>Review program:</b> systematically collect verified
                      customer feedback.
                    </span>
                    <span className="gp-badge med">Medium</span>
                  </div>
                  <div className="gp-progress">
                    <i style={{ width: "65%" }} />
                  </div>
                  <div className="gp-priority-item">
                    <strong>P2 · Scale</strong>
                    <span>
                      <b>Search optimization:</b> improve titles, attributes
                      and internal search relevance without keyword
                      stuffing.
                    </span>
                    <span className="gp-badge low">Lower</span>
                  </div>
                  <div className="gp-progress">
                    <i style={{ width: "48%" }} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {page === "roadmap" && (
            <section className="gp-page active">
              <div className="gp-card">
                <h3 className="gp-section-title">
                  30-day e-commerce optimization roadmap
                </h3>
                <div className="gp-roadmap">
                  <div className="gp-week">
                    <h4>Days 1–7 · Diagnose</h4>
                    <ul>
                      <li>Audit top traffic SKUs</li>
                      <li>Map funnel drop-offs</li>
                      <li>Benchmark competitor listings</li>
                      <li>Identify stock-out hotspots</li>
                    </ul>
                  </div>
                  <div className="gp-week">
                    <h4>Days 8–14 · Fix</h4>
                    <ul>
                      <li>Rewrite priority listings</li>
                      <li>Improve image galleries</li>
                      <li>Correct specifications</li>
                      <li>Set stock alerts</li>
                    </ul>
                  </div>
                  <div className="gp-week">
                    <h4>Days 15–21 · Test</h4>
                    <ul>
                      <li>Test price/value messaging</li>
                      <li>Test CTA placement</li>
                      <li>Launch review collection</li>
                      <li>Monitor returns reasons</li>
                    </ul>
                  </div>
                  <div className="gp-week">
                    <h4>Days 22–30 · Scale</h4>
                    <ul>
                      <li>Roll winning changes out</li>
                      <li>Re-rank priority SKUs</li>
                      <li>Review KPI movement</li>
                      <li>Set next-month experiments</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="gp-grid gp-three">
                <div className="gp-card">
                  <div className="gp-kpi">+10–15%</div>
                  <div className="gp-kpi-label">Target ATC improvement</div>
                </div>
                <div className="gp-card">
                  <div className="gp-kpi">+8–12%</div>
                  <div className="gp-kpi-label">
                    Target conversion improvement
                  </div>
                </div>
                <div className="gp-card">
                  <div className="gp-kpi">−10%</div>
                  <div className="gp-kpi-label">
                    Target return-rate reduction
                  </div>
                </div>
              </div>
            </section>
          )}

          {page === "product" && (
            <section className="gp-page active">
              <div className="gp-card">
                <h3 className="gp-section-title">
                  Fully optimized sample product listing
                </h3>
                <div className="gp-product">
                  <div className="gp-product-img">🎧</div>
                  <div>
                    <div className="gp-eyebrow">Electronics / Audio</div>
                    <h2 style={{ margin: "6px 0" }}>
                      AeroBeat Pro Wireless Headphones — Active Noise
                      Cancellation, 40-Hour Battery
                    </h2>
                    <div className="gp-price">
                      ₹4,999 <span className="gp-old">₹6,499</span>
                    </div>
                    <div className="gp-chips">
                      <span className="gp-chip">ANC</span>
                      <span className="gp-chip">40-hour battery</span>
                      <span className="gp-chip">Bluetooth 5.3</span>
                      <span className="gp-chip">Fast charging</span>
                    </div>
                    <p className="gp-sub">
                      Enjoy focused listening with active noise cancellation,
                      comfortable over-ear cushioning and up to 40 hours of
                      battery life. Designed for work, travel and everyday
                      entertainment.
                    </p>
                    <button
                      className="gp-btn primary"
                      onClick={() => alert("Demo: product added to cart")}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div style={{ height: 18 }} />
                <div className="gp-checklist">
                  <div className="gp-check">
                    <b>✓</b> Clear, benefit-led title
                  </div>
                  <div className="gp-check">
                    <b>✓</b> Accurate technical attributes
                  </div>
                  <div className="gp-check">
                    <b>✓</b> Competitive value proposition
                  </div>
                  <div className="gp-check">
                    <b>✓</b> Scannable feature chips
                  </div>
                  <div className="gp-check">
                    <b>✓</b> Product expectations clearly stated
                  </div>
                  <div className="gp-check">
                    <b>✓</b> Strong primary CTA
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="gp-card" style={{ marginTop: 16 }}>
            <h3 className="gp-section-title">KPI dashboard structure</h3>
            <div className="gp-grid gp-three">
              <div>
                <b>Acquisition</b>
                <p className="gp-sub">
                  Traffic, product-page views, search visibility
                </p>
              </div>
              <div>
                <b>Conversion</b>
                <p className="gp-sub">
                  Add-to-cart rate, conversion rate, checkout completion
                </p>
              </div>
              <div>
                <b>Customer</b>
                <p className="gp-sub">
                  Return rate, review rating, repeat purchase
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
