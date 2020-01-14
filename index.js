Decimal.prototype.tof = function(x) {
  if (this.exponent >= 5 || this.exponent <= -5) {
    return r100(this.mantissa) + "e" + this.exponent;
  } else {
    return +this.toFixed(x);
  }
};
Decimal.prototype.flor = function(x) {
  return this.add(0.5).floor();
};
Decimal.prototype.gte = function(x) {
  return this.greaterThanOrEqualTo(x);
};
Decimal.prototype.lte = function(x) {
  return this.lessThanOrEqualTo(x);
};
Decimal.prototype.gt = function(x) {
  return this.greaterThan(x);
};
Decimal.prototype.lt = function(x) {
  return this.lessThan(x);
};
Element.prototype.qs = function(x) {
  return this.querySelector(x);
};
Element.prototype.qsa = function(x) {
  return this.querySelectorAll(x);
};
const tim = () => new Date().getTime();
const ssend = (stat, numb) => {
  kongregate.stats.submit(stat, numb);
};
var qs = function(query) {
  this.cache = this.cache || {};

  if (!this.cache[query]) {
    this.cache[query] = document.querySelector(query);
  }

  return this.cache[query];
};
var qsa = function(query) {
  this.cache = this.cache || {};

  if (!this.cache[query]) {
    this.cache[query] = document.querySelectorAll(query);
  }

  return this.cache[query];
};

$(() => {
  createGame();

  $(".menu .item").tab({ context: "parent" });

  maingame();
});

var gd = {
  version: 1.0,

  tickps: new Decimal(10),
  segtick: new Decimal(0.1),

  timelast: tim(),
  timenow: tim(),
  diff: 0,

  hovered: "",

  money: new Decimal(100),

  alloc: new Decimal(0),
  people: new Decimal(5),

  facts: {
    F1: {
      prod: {
        outs: {
          circuit: {
            upb: new Decimal(0),
            alloc: new Decimal(0)
          },
          plastic_box: {
            upb: new Decimal(0),
            alloc: new Decimal(0)
          },
          metal_box: {
            upb: new Decimal(0),
            alloc: new Decimal(0)
          }
        },
        batch: new Decimal(1),
        timetot: new Decimal(10),
        timeleft: new Decimal(10),
        width: 0
      },

      sales: {
        outs: {
          circuit: {
            upb: new Decimal(0),
            alloc: new Decimal(0),
            price: new Decimal(5)
          },
          plastic_box: {
            upb: new Decimal(0),
            alloc: new Decimal(0),
            price: new Decimal(3)
          },
          metal_box: {
            upb: new Decimal(0),
            alloc: new Decimal(0),
            price: new Decimal(6)
          }
        },
        batch: new Decimal(1),
        timetot: new Decimal(5),
        timeleft: new Decimal(5),
        width: 0
      },

      effic: {
        prod: {
          timetot: new Decimal(30),
          timeleft: new Decimal(30),
          alloc: new Decimal(0)
        },
        sales: {
          timetot: new Decimal(30),
          timeleft: new Decimal(30),
          alloc: new Decimal(0)
        }
      }
    }
  },

  tree: {
    circuit: {
      inputs: ["wire", "plastic"],
      qinputs: [2, 3]
    },
    plastic_box: {
      inputs: ["plastic"],
      qinputs: [5]
    },
    metal_box: {
      inputs: ["metal"],
      qinputs: [5]
    }
  },

  supply: {
    F1: {
      plastic: {
        norder: new Decimal(0),
        ucost: new Decimal(0.3),
        intrs: new Decimal(0),
        stored: new Decimal(0),
        timetot: new Decimal(20),
        timeleft: new Decimal(20),
        width: 0
      },
      wire: {
        norder: new Decimal(0),
        ucost: new Decimal(0.5),
        intrs: new Decimal(0),
        stored: new Decimal(0),
        timetot: new Decimal(20),
        timeleft: new Decimal(20),
        width: 0
      },
      metal: {
        norder: new Decimal(0),
        ucost: new Decimal(1.3),
        intrs: new Decimal(0),
        stored: new Decimal(0),
        timetot: new Decimal(20),
        timeleft: new Decimal(20),
        width: 0
      }
    }
  },

  ware: {
    F1: {
      items: {
        plastic: {
          stored: new Decimal(0),
          uspace: new Decimal(0.5),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        },
        wire: {
          stored: new Decimal(0),
          uspace: new Decimal(0.5),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        },
        metal: {
          stored: new Decimal(0),
          uspace: new Decimal(1),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        },
        circuit: {
          stored: new Decimal(0),
          uspace: new Decimal(0.1),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        },
        plastic_box: {
          stored: new Decimal(0),
          uspace: new Decimal(0.1),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        },
        metal_box: {
          stored: new Decimal(0),
          uspace: new Decimal(0.1),
          tspace: new Decimal(0),
          sprice: new Decimal(0.15),
          sqtd: new Decimal(0)
        }
      },
      left: new Decimal(50),
      total: new Decimal(50)
    }
  }
};

const gloop = () => {
  setTimeout(() => {
    updategame();

    gloop();
  }, gd.segtick.mul(1000).toNumber());
};

const domloop = () => {
  setTimeout(() => {
    updatedom();

    domloop();
  }, 100);
};

const maingame = () => {
  gloop();
  domloop();
};

const updategame = () => {
  gd.timenow = tim();
  gd.diff = gd.timenow - gd.timelast;

  updatesupply();
  updatefacts();
  // updateresearch();

  // for(let item in gd.ware.F1.items) {
  //   console.log(item,gd.ware.F1.items[item].stored.tof());
  // }

  updatewares();

  gd.timelast = gd.timenow;
};

const getInps = item => {
  let str = "";
  let tr = gd.tree[item];
  for (let i = 0; i < tr.inputs.length; i++) {
    str += tr.qinputs[i] + " " + tr.inputs[i] + ", ";
  }

  return str.slice(0, -2);
};

const updatewares = () => {
  for (let fact in gd.ware) {
    for (let item in gd.ware[fact].items) {
      gd.ware[fact].items[item].tspace = gd.ware[fact].items[item].stored.mul(
        gd.ware[fact].items[item].uspace
      );
    }
  }
};

const rp = item => item.replace(/_/g, " ");

const updatedom = () => {
  qs(".imon").textContent = gd.money.tof(2);

  for (let fact in gd.facts) {
    for (let item in gd.facts[fact].prod.outs) {
      qs(
        `[data-tab='${fact}'] .prod tbody tr.${item} .inputs`
      ).textContent = getInps(item);

      qs(
        `[data-tab='${fact}'] .prod tbody tr.${item} .output`
      ).textContent = rp(item);

      qs(
        `[data-tab='${fact}'] .prod tbody tr.${item} .upb`
      ).textContent = gd.facts[fact].prod.outs[item].upb.tof();

      qs(
        `[data-tab='${fact}'] .prod tbody tr.${item} .alloc`
      ).textContent = gd.facts[fact].prod.outs[item].alloc.tof();
    }

    qs(`[data-tab='${fact}'] .prod .gbar`).style.width =
      gd.facts[fact].prod.width + "%";

    qs(`[data-tab='${fact}'] .prod .gbar`).textContent =
      gd.facts[fact].prod.timeleft.tof(1) + "s";

    for (let item in gd.facts[fact].sales.outs) {
      qs(`[data-tab='${fact}'] .sales tbody tr.${item} .price`).textContent =
        "$ " + gd.facts[fact].sales.outs[item].price.tof();

      qs(
        `[data-tab='${fact}'] .sales tbody tr.${item} .output`
      ).textContent = rp(item);

      qs(
        `[data-tab='${fact}'] .sales tbody tr.${item} .stored`
      ).textContent = gd.ware[fact].items[item].stored.tof();

      qs(
        `[data-tab='${fact}'] .sales tbody tr.${item} .upb`
      ).textContent = gd.facts[fact].sales.outs[item].upb.tof();

      qs(
        `[data-tab='${fact}'] .sales tbody tr.${item} .alloc`
      ).textContent = gd.facts[fact].sales.outs[item].alloc.tof();
    }

    qs(`[data-tab='${fact}'] .sales .gbar`).style.width =
      gd.facts[fact].sales.width + "%";

    qs(`[data-tab='${fact}'] .sales .gbar`).textContent =
      gd.facts[fact].sales.timeleft.tof(1) + "s";

    for (let item in gd.supply[fact]) {
      qs(`[data-tab='s${fact}'] tr.${item} .item`).textContent = item;
      qs(`[data-tab='s${fact}'] tr.${item} .ucost`).textContent =
        gd.supply[fact][item].ucost;
      qs(`[data-tab='s${fact}'] tr.${item} .norder`).textContent =
        gd.supply[fact][item].norder;
      qs(`[data-tab='s${fact}'] tr.${item} .intrs`).textContent =
        gd.supply[fact][item].intrs;
      qs(`[data-tab='s${fact}'] tr.${item} .stored`).textContent =
        gd.supply[fact][item].stored;

      qs(`[data-tab='s${fact}'] tr.${item} .gbar`).style.width =
        gd.supply[fact][item].width + "%";
      qs(`[data-tab='s${fact}'] tr.${item} .gbar`).textContent =
        gd.supply[fact][item].timeleft.tof(1) + "s";
    }

    for (let item in gd.ware[fact].items) {
      let it = gd.ware[fact].items[item];

      qs(`[data-tab='w${fact}'] tr.${item} .item`).textContent = rp(item);
      qs(
        `[data-tab='w${fact}'] tr.${item} .stored`
      ).textContent = it.stored.tof();
      qs(
        `[data-tab='w${fact}'] tr.${item} .uspace`
      ).textContent = it.uspace.tof(1);
      qs(
        `[data-tab='w${fact}'] tr.${item} .tspace`
      ).textContent = it.tspace.tof(1);
      qs(
        `[data-tab='w${fact}'] tr.${item} .sprice`
      ).textContent = it.sprice.tof(1);
      qs(`[data-tab='w${fact}'] tr.${item} .order`).textContent = it.sqtd.tof();
    }

    qs(`[data-tab='w${fact}'] .sqleft`).textContent = gd.ware[fact].left.tof(1);
  }
};

const updatefacts = () => {
  updateprod();
  updatesales();
};

const subware = (fact, item, qtd) => {
  gd.ware[fact].items[item].stored = gd.ware[fact].items[item].stored.sub(qtd);
  gd.ware[fact].left = gd.ware[fact].left.add(
    gd.ware[fact].items[item].uspace.mul(qtd)
  );

  gd.supply[fact][item] &&
    (gd.supply[fact][item].stored = gd.ware[fact].items[item].stored);
};

const addware = (fact, item, qtd) => {
  gd.ware[fact].items[item].stored = gd.ware[fact].items[item].stored.add(qtd);
  gd.ware[fact].left = gd.ware[fact].left.sub(
    gd.ware[fact].items[item].uspace.mul(qtd)
  );
  gd.supply[fact][item] &&
    (gd.supply[fact][item].stored = gd.ware[fact].items[item].stored);
};

const updateprod = () => {
  for (let fact in gd.facts) {
    let prod = gd.facts[fact].prod;

    // prod.timeleft = prod.timeleft.sub(gd.segtick);
    let size = gd.hovered == fact + "-prod" ? 0.4 : 0.1;
    prod.timeleft = prod.timeleft.sub(size);
    let ots = prod.outs;
    for (let i in ots) {
      ots[i].upb = ots[i].alloc.mul(prod.batch);
    }
    if (prod.timeleft.lte(0)) {
      if (checkware(ots, fact) && checkinp(ots, fact)) {
        for (let i in ots) {
          addware(fact, i, ots[i].upb);
          let tr = gd.tree[i];
          for (let j = 0; j < tr.inputs.length; j++) {
            subware(fact, tr.inputs[j], ots[i].upb.mul(tr.qinputs[j]));
          }
        }

        prod.timeleft = prod.timetot;
      } else {
        prod.timeleft = new Decimal(1);
      }
    }
    prod.width = prod.timetot
      .sub(prod.timeleft)
      .mul(100)
      .div(prod.timetot);
  }
};

const checkinp = (ots, fact) => {
  let canprod = true;

  let needs = {};
  for (let i in ots) {
    let tr = gd.tree[i];
    for (let j = 0; j < tr.inputs.length; j++) {
      if (!needs[tr.inputs[j]]) {
        needs[tr.inputs[j]] = ots[i].upb.mul(tr.qinputs[j]);
      } else {
        needs[tr.inputs[j]] = needs[tr.inputs[j]].add(
          ots[i].upb.mul(tr.qinputs[j])
        );
      }
    }
  }
  for (let i in ots) {
    let tr = gd.tree[i];
    for (let j = 0; j < tr.inputs.length; j++) {
      if (gd.ware[fact].items[tr.inputs[j]].stored.lt(needs[tr.inputs[j]])) {
        canprod = false;
      }
    }
  }
  return canprod;
};

const checkware = (ots, fact) => {
  let wsum = new Decimal(0);
  for (let i in ots) {
    wsum = wsum.add(ots[i].upb.mul(gd.ware[fact].items[i].uspace));
  }
  return wsum.lte(gd.ware[fact].left);
};

const addmoney = qtd => {
  gd.money = gd.money.add(qtd);
};

const updatesales = () => {
  for (let fact in gd.facts) {
    let sales = gd.facts[fact].sales;

    // sales.timeleft = sales.timeleft.sub(gd.segtick);
    let size = gd.hovered == fact + "-sales" ? 0.4 : 0.1;
    sales.timeleft = sales.timeleft.sub(size);

    for (let i in sales.outs) {
      sales.outs[i].upb = sales.outs[i].alloc.mul(sales.batch);
    }
    if (sales.timeleft.lte(0)) {
      for (let i in sales.outs) {
        let out = sales.outs[i];
        let sale = gd.ware[fact].items[i].stored.sub(out.upb).lt(0)
          ? gd.ware[fact].items[i].stored
          : out.upb;

        subware(fact, i, sale);
        addmoney(sale.mul(out.price));
      }
      sales.timeleft = sales.timetot;
    }

    sales.width = sales.timetot
      .sub(sales.timeleft)
      .mul(100)
      .div(sales.timetot);
  }
};

const updatesupply = () => {
  for (let fact in gd.supply) {
    for (let item in gd.supply[fact]) {
      let it = gd.supply[fact][item];
      if (it.intrs.gt(0)) {
        // it.timeleft = it.timeleft.sub(gd.segtick);
        let size = gd.hovered == fact + "-supply-" + item ? 0.4 : 0.1;
        it.timeleft = it.timeleft.sub(size);

        if (it.timeleft.lte(0)) {
          if (
            it.intrs
              .mul(gd.ware[fact].items[item].uspace)
              .lte(gd.ware[fact].left)
          ) {
            addware(fact, item, it.intrs);
            it.timeleft = it.timetot;
            if (canbuy(it.ucost.mul(it.norder))) {
              it.intrs = it.norder;
              gd.money = gd.money.sub(it.ucost.mul(it.norder));
            } else {
              it.intrs = new Decimal(0);
            }
          } else {
            it.timeleft = new Decimal(1);
            //alerta full
          }
        }
      } else if (it.norder.gt(0) && canbuy(it.ucost.mul(it.norder))) {
        it.intrs = it.norder;
        gd.money = gd.money.sub(it.ucost.mul(it.norder));
      }
      it.width = it.timetot
        .sub(it.timeleft)
        .mul(100)
        .div(it.timetot);
    }
  }
};

const tinc = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);

  if (gd.people.sub(gd.alloc).gte(mult)) {
    gd.alloc = gd.alloc.add(mult);
    gd.facts[fact][act].outs[item].alloc = gd.facts[fact][act].outs[
      item
    ].alloc.add(mult);
  }
};

const tdec = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);
  let size = gd.facts[fact][act].outs[item].alloc.sub(mult).lt(0)
    ? gd.facts[fact][act].outs[item].alloc
    : mult;

  gd.alloc = gd.alloc.sub(size);
  gd.facts[fact][act].outs[item].alloc = gd.facts[fact][act].outs[
    item
  ].alloc.sub(size);
};

const addno = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);

  gd[act][fact][item].norder = gd[act][fact][item].norder.add(mult);
};

const subno = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);

  gd[act][fact][item].norder = gd[act][fact][item].norder.sub(mult).lte(0)
    ? new Decimal(0)
    : gd[act][fact][item].norder.sub(mult);
};

const addsell = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);

  gd[act][fact].items[item].sqtd = gd[act][fact].items[item].sqtd.add(mult);
};

const subsell = el => {
  let [fact, act, item] = el.id.split("-");
  let mult = new Decimal(1);

  gd[act][fact].items[item].sqtd = gd[act][fact].items[item].sqtd
    .sub(mult)
    .lte(0)
    ? new Decimal(0)
    : gd[act][fact].items[item].sqtd.sub(mult);
};

const fastSell = el => {
  let [fact, act, item] = el.id.split("-");
  let it = gd[act][fact].items[item];

  let sale = it.stored.sub(it.sqtd).lt(0) ? it.stored : it.sqtd;

  subware(fact, item, sale);
  addmoney(sale.mul(it.sprice));
};

const hover = el => {
  gd.hovered = el.id;
};

const clearhover = () => {
  gd.hovered = "";
};

const canbuy = cost => {
  return gd.money.gte(cost);
};

const createTabular = lt => {
  let hstr = "";
  hstr += '<div class="ui top attached tabular menu tmenu">';
  for (let fact in gd.facts) {
    hstr += /* HTML */ `
      <a class="item ${fact == "F1" ? "active" : ""}" data-tab="${lt + fact}"
        >${fact}</a
      >
    `;
  }
  hstr += "</div>";
  return hstr;
};

const createWareTables = () => {
  let hstr = "";
  for (let fact in gd.facts) {
    hstr += /* HTML */ `
      <div
        class="ui bottom attached tab gtab segment active w${fact} pgtest"
        data-tab="w${fact}"
      >
        <div class="ui segment red modl sware noselect">
          <h3>
            <i class="warehouse icon"></i> Factory Inventory Left:
            <span class="sqleft">${gd.ware[fact].left.tof(1)}</span> SQM
          </h3>
          <table class="ui table basic celled selectable waret ctbl">
            <thead>
              <th>Resource</th>
              <th>Stored</th>
              <th>Unit SQM</th>
              <th>Total SQM</th>
              <th>Selling Price</th>
              <th class="three wide">Sell Quantity</th>
              <th class="three wide">Action</th>
            </thead>
            <tbody>
              ${wtbody(fact)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  return hstr;
};

const wtbody = fact => {
  let hstr = "";

  for (let item in gd.ware[fact].items) {
    let it = gd.ware[fact].items[item];
    hstr += /* HTML */ `
      <tr class="${item}">
        <td class="item">${rp(item)}</td>
        <td class="stored">${it.stored.tof()}</td>
        <td class="uspace">${it.uspace.tof(1)}</td>
        <td class="tspace">${it.tspace.tof(1)}</td>
        <td>$ <span class="sprice">${it.sprice.tof(1)}</span></td>
        <td>
          <span class="order">${it.sqtd.tof()}</span>
          <div class="ui icon buttons">
            <div
              class="increment ui basic albt green button icon"
              id="${fact + "-ware-" + item}"
              onclick="addsell(this)"
            >
              <i class="plus icon"></i>
            </div>
            <div
              class="decrement ui basic albt red button icon"
              id="${fact + "-ware-" + item}"
              onclick="subsell(this)"
            >
              <i class="minus icon"></i>
            </div>
          </div>
        </td>
        <td>
          <button
            id="${fact + "-ware-" + item}"
            class="ui red albt button"
            onclick="fastSell(this)"
          >
            Fast Sell
          </button>
        </td>
      </tr>
    `;
  }

  return hstr;
};

const createGame = () => {
  createSupply();
  createFacts();
  createWare();
};

const createWare = () => {
  let hstr = "";

  hstr += createTabular("w");
  hstr += createWareTables();

  document.querySelector(".ui.tab.ware").innerHTML = hstr;
};

const createSupply = () => {
  let hstr = "";

  hstr += createTabular("s");
  hstr += createSupplyTables();

  document.querySelector(".ui.tab.supply").innerHTML = hstr;
};

const createSupplyTables = () => {
  let hstr = "";
  for (let fact in gd.supply) {
    hstr += /* HTML */ `
      <div
        class="ui bottom attached tab gtab segment active s${fact} pgtest"
        data-tab="s${fact}"
      >
        <table class="ui table green celled selectable ctbl">
          <thead>
            <th>Resource</th>
            <th class="three wide">Next Order</th>
            <th>Unit Cost</th>
            <th>In Transit</th>
            <th class="six wide">Transit Progress (hover to speed up)</th>
            <th>Stored</th>
          </thead>
          <tbody>
            ${supplytbody(fact)}
          </tbody>
        </table>
      </div>
    `;
  }
  return hstr;
};

const supplytbody = fact => {
  let hstr = "";
  for (let item in gd.supply[fact]) {
    let it = gd.supply[fact][item];
    hstr += /* HTML */ `
      <tr class="${item}">
        <td class="item">${item}</td>
        <td>
          <span class="norder">${it.norder.tof()}</span>
          <div class="ui icon buttons">
            <div
              class="increment ui basic albt green button icon"
              id="${fact + "-supply-" + item}"
              onclick="addno(this)"
            >
              <i class="plus icon"></i>
            </div>
            <div
              class="decrement ui basic albt red button icon"
              id="${fact + "-supply-" + item}"
              onclick="subno(this)"
            >
              <i class="minus icon"></i>
            </div>
          </div>
        </td>
        <td class="ucost">$ ${it.ucost.tof(1)}</td>
        <td class="intrs">${it.intrs.tof()}</td>
        <td>
          <div
            class="pgbar"
            id="${fact + "-supply-" + item}"
            onmouseover="hover(this)"
            onmouseout="clearhover()"
          >
            <div class="gbar barr">5s</div>
          </div>
        </td>
        <td class="stored">${it.stored.tof()}</td>
      </tr>
    `;
  }
  return hstr;
};

const createFacts = () => {
  let hstr = "";

  hstr += createTabular("");
  hstr += createFactTables();

  document.querySelector(".ui.tab.machs").innerHTML = hstr;
};

const createFactTables = () => {
  let hstr = "";
  for (let fact in gd.facts) {
    hstr += /* HTML */ `
      <div
        class="ui bottom attached tab gtab segment active ${fact}"
        data-tab="${fact}"
      >
        ${createProd(fact)} ${createSales(fact)} ${createEffs(fact)}
      </div>
    `;
  }

  return hstr;
};

const createProd = fact => {
  let hstr = "";

  hstr += /* HTML */ `
    <div class="ui segment blue modl prod noselect">
      <i class="industry icon"></i> Production
      <table class="ui table basic celled selectable ctbl">
        <thead>
          <th>Inputs</th>
          <th>Outputs</th>
          <th>Units per Batch</th>
          <th class="four wide">Allocated People</th>
        </thead>
        <tbody>
          ${prodtbody(fact)}
        </tbody>
      </table>
      <span class="btprod">1 Batch every 10 seconds (hover to speed up)</span>
      <div
        class="pgbar"
        id="${fact + "-prod"}"
        onmouseover="hover(this)"
        onmouseout="clearhover()"
      >
        <div class="gbar barr">5s</div>
      </div>
    </div>
  `;

  return hstr;
};

const prodtbody = fact => {
  let hstr = "";
  for (let item in gd.facts[fact].prod.outs) {
    let it = gd.facts[fact].prod.outs[item];
    hstr += /* HTML */ `
      <tr class="${item}">
        <td class="inputs">${getInps(item)}</td>
        <td class="output">${item}</td>
        <td class="upb">${it.upb.tof()}</td>
        <td>
          <span class="alloc">${it.alloc.tof()}</span>
          <div class="ui icon buttons">
            <div
              class="increment ui basic albt green button icon"
              id="${fact + "-prod-" + item}"
              onclick="tinc(this)"
            >
              <i class="plus icon"></i>
            </div>
            <div
              class="decrement ui basic albt red button icon"
              id="${fact + "-prod-" + item}"
              onclick="tdec(this)"
            >
              <i class="minus icon"></i>
            </div>
          </div>
        </td>
      </tr>
    `;
  }
  return hstr;
};

const createSales = fact => {
  let hstr = "";

  hstr += /* HTML */ `
    <div class="ui segment violet modl sales noselect">
      <i class="bullhorn icon"></i> Sales
      <table class="ui table basic celled selectable ctbl">
        <thead>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Sales per Batch</th>
          <th class="four wide">Allocated People</th>
        </thead>
        <tbody>
          ${salestbody(fact)}
        </tbody>
      </table>
      <span class="btprod">1 Batch every 5 seconds (hover to speed up)</span>
      <div
        class="pgbar"
        id="${fact + "-sales"}"
        onmouseover="hover(this)"
        onmouseout="clearhover()"
      >
        <div class="gbar barr">5s</div>
      </div>
    </div>
  `;
  return hstr;
};

const salestbody = fact => {
  let hstr = "";
  for (let item in gd.facts[fact].sales.outs) {
    let it = gd.facts[fact].sales.outs[item];
    hstr += /* HTML */ `
      <tr class="${item}">
        <td class="output">${item}</td>
        <td class="stored">${gd.ware[fact].items[item].stored.tof()}</td>
        <td class="price">$ ${it.price.tof(1)}</td>
        <td class="upb">${it.upb.tof()}</td>
        <td>
          <span class="alloc">${it.alloc.tof()}</span>
          <div class="ui icon buttons">
            <div
              class="increment ui basic albt green button icon"
              id="${fact + "-sales-" + item}"
              onclick="tinc(this)"
            >
              <i class="plus icon"></i>
            </div>
            <div
              class="decrement ui basic albt red button icon"
              id="${fact + "-sales-" + item}"
              onclick="tdec(this)"
            >
              <i class="minus icon"></i>
            </div>
          </div>
        </td>
      </tr>
    `;
  }
  return hstr;
};

const createEffs = fact => {
  let hstr = "";

  hstr += /* HTML */ `
    <div class="ui segment purple modl noselect">
      <i class="chart line icon"></i> Efficiency Research
      <table class="ui table basic celled selectable upgd ctbl">
        <thead>
          <th class="three wide">Upgrade</th>
          <th>Level</th>
          <th class="eight wide">Progress (hover to speed up)</th>
          <th class="four wide">Allocated People</th>
        </thead>
        <tbody>
          <tr>
            <td>Production Batch</td>
            <td>0</td>
            <td>
              <div
                class="pgbar"
                onmouseover="hover(this)"
                onmouseout="clearhover()"
              >
                <div class="gbar barr">5s</div>
              </div>
            </td>
            <td>
              <span class="alloc">0</span>
              <div class="ui icon buttons">
                <div
                  class="increment ui basic albt green button icon"
                  onclick="tinc(this)"
                >
                  <i class="plus icon"></i>
                </div>
                <div
                  class="decrement ui basic albt red button icon"
                  onclick="tdec(this)"
                >
                  <i class="minus icon"></i>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Sales Batch</td>
            <td>0</td>
            <td>
              <div
                class="pgbar"
                onmouseover="hover(this)"
                onmouseout="clearhover()"
              >
                <div class="gbar barr">5s</div>
              </div>
            </td>
            <td>
              <span class="alloc">0</span>
              <div class="ui icon buttons">
                <div
                  class="increment ui basic albt green button icon"
                  onclick="tinc(this)"
                >
                  <i class="plus icon"></i>
                </div>
                <div
                  class="decrement ui basic albt red button icon"
                  onclick="tdec(this)"
                >
                  <i class="minus icon"></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  return hstr;
};
