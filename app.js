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
const things = ['Skateboard', "Classical Guitar", "Programming", "Music"];


// ejs setting
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true,
});


// Json Prettier Middleware
app.use(json());

// Mount Koa Body Parser
app.use(bodyParser());


// Simple Koa Middleware
// app.use(async ctx => ctx.body = "Hello World");


// Middleware function
const index = async (ctx, next) => {
  await ctx.render('index',
    {
      title: 'Things I Love:',
      things: things,
    });
};

const showAddPage = async (ctx, next) => {
  await ctx.render('add');
};

const addThing = async (ctx, next) => {
  const {body} = ctx.request;
  things.push(body.thing);
  ctx.redirect('/')
};


// Router Middleware
router.get('/', index);
router.get('/add', showAddPage);
router.post('/add', addThing);

router.get('/test', async (ctx, next) => {
  ctx.body = 'Hello Test';
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
