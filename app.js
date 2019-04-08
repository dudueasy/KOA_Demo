const path = require('path');

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const Router = require('koa-router');

const app = new Koa();
const PORT = 4000;
const router = new Router();

// Replace With DB Query Statement
let things = ['Skateboard', "Classical Guitar", "Programming", "Music"];


// ejs setting
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  // debug: true,
});


// Json Prettier Middleware
app.use(json());

// Mount Koa Body Parser
app.use(bodyParser());


// Simple Koa Middleware
// app.use(async ctx => ctx.body = "Hello World");


// Router Middleware
router.get('/', index);
router.get('/add', showAddPage);
router.post('/add', addThing);

router.get('/test', async (ctx, next) => {
  ctx.body = 'Hello Test';
});

router.get('/delete/:index', deleteThing);


// get url params
router.get('/test2/:username', async (ctx, next) => {
  ctx.body = `Hello ${ctx.params.username}`;
});


app.use(router.routes());
app.use(router.allowedMethods());


// Middleware function
async function index(ctx, next) {
  await ctx.render('index',
    {
      title: 'Things I Love:',
      things: things,
    });
}

async function showAddPage(ctx, next) {
  await ctx.render('add');
}

async function addThing(ctx, next) {
  const {body} = ctx.request;
  things.push(body.thing);
  ctx.redirect('/');
}

async function deleteThing(ctx, next) {
  const index = ctx.params.index;
  things = things.filter((value, i) => (i != index));
  // things.splice(index, 1)
  console.log("things:", things);
  ctx.redirect('/');
}


app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
