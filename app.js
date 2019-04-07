const path = require('path')

const Koa = require('koa');
const json = require('koa-json');
const render = require('koa-ejs');
const Router = require('koa-router');

const app = new Koa();
const PORT = 4000;
const router = new Router();

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

// Simple Koa Middleware
// app.use(async ctx => ctx.body = "Hello World");


// Router Middleware

router.get('/', async(ctx, next)=>{
  await ctx.render('index', {title: 'Welcome'})
})


router.get('/test', async (ctx, next) => {
  ctx.body = 'Hello Test';
});


app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
