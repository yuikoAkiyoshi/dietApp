const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mongoose = require('mongoose');
const connectOption = {
 useUnifiedTopology: true,
 useNewUrlParser: true,
 useFindAndModify: false
}

const dbUrl = "mongodb://localhost/dietApp"; // dbの名前をdietAppに指定
mongoose.connect(dbUrl, connectOption);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

// モデルの作成
const todoSchema = require('./models/todoSchema');
const pointSchema = require('./models/pointSchema');
const giftSchema = require('./models/giftSchema');
const weightSchema = require('./models/weightSchema');
const targetWeightSchema = require('./models/targetWeightSchema');
// mongoose.modelの第一引数の複数形の名前のコレクションが生成される
const Todo = mongoose.model('todo', todoSchema, 'todo');
const Point = mongoose.model('point', pointSchema, 'point');
const Gift = mongoose.model('gift', giftSchema, 'gift');
const Weight = mongoose.model('weight', weightSchema, 'weight');
const TargetWeight = mongoose.model('targetWeight', targetWeightSchema, 'targetWeight');


app.prepare().then(() => {
  const server = express()
  // ↓この記述によりJsonデータをreq.bodyで操作できる様になります
  server.use(express.json());

  // TODOリストを取得-GET
  server.get("/index/get", async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
  });

  // TotalPointを取得-GET
  server.get("/totalPoint/get", async (req, res) => {
    const totalPoint = await Point.find({});
    res.json(totalPoint);
  });

  // Gift一覧を取得-GET
  server.get("/gifts/get", async (req, res) => {
    const gifts = await Gift.find({});
    res.json(gifts);
  });

  // Weight一覧を取得-GET
  server.get("/weights/get", async (req, res) => {
    const weights = await Weight.find({});
    res.json(weights);
  });

  // TargetWeightを取得-GET
  server.get("/targetWeight/get", async (req, res) => {
    const targetWeight = await TargetWeight.find({});
    res.json(targetWeight);
  });

  // 新しいTODOを作る-POST
  server.post("/newTodo/post", async (req, res) => {
    const todo = new Todo({
      todo: req.body.todo,
      point: req.body.point
    })
    const savedTodo = await todo.save();
    return app.render(req, res, '/newTodo', req.query)
  });

  // 新しいTotalPointを作る-POST
  server.post("/totalPoint/post", async (req, res) => {
    const point = new Point({
      totalPoint: 0
    })
    const savedPoint = await point.save();
    return app.render(req, res, '/newPoint', req.query)
  });

  // 新しいGiftを作る-POST
  server.post("/gift/post", async (req, res) => {
    const gift = new Gift({
     name: req.body.name,
     point: req.body.point
    })
    const savedGift = await gift.save();
    return app.render(req, res, '/newGift', req.query)
  });

  // 新しいWeightを作る-POST
  server.post("/weight/post", async (req, res) => {
    const weight = new Weight({
     date: req.body.date,
     weight: req.body.weight
    })
    const savedWeight = await weight.save();
    return app.render(req, res, '/newWeight', req.query)

  });

  // 新しいTargetWeightを作る-POST
  server.post("/targetWeight/post", async (req, res) => {
    const targetWeight = new TargetWeight({
     targetWeight: req.body.targetWeight
    })
    const savedTargetWeight = await targetWeight.save();
    return app.render(req, res, '/newTargetWeight', req.query)
  });

  // TODOを削除-DELETE
  server.delete('/index/delete', async (req, res) => {
    const { id } = req.body
    await Todo.findByIdAndRemove(id, error => {
      if(error) res.status(500).send()
      else {
        res.status(200).send();
      }
    });
  })

  // Giftを削除-DELETE
  server.delete('/gift/delete', async (req, res) => {
    const { id } = req.body
    await Gift.findByIdAndRemove(id, error => {
      if(error) res.status(500).send()
      else {
        res.status(200).send();
      }
    });
  })

  // Weightを削除-DELETE
  server.delete('/weight/delete', async (req, res) => {
    const { id } = req.body
    await Weight.findByIdAndRemove(id, error => {
      if(error) res.status(500).send()
      else {
        res.status(200).send();
      }
    });
  })

  // Pointを削除-DELETE
  server.delete('/totalPoint/delete', async (req, res) => {
    const { id } = req.body
    await Point.findByIdAndRemove(id, error => {
      if(error) res.status(500).send()
      else {
        res.status(200).send();
      }
    });
  })

  // TargetWeightを削除-DELETE
  server.delete('/targetWeight/delete', async (req, res) => {
    const { id } = req.body
    await TargetWeight.findByIdAndRemove(id, error => {
      if(error) res.status(500).send()
      else {
        res.status(200).send();
      }
    });
  })

  // pointを加算減算-PUT
  server.put("/totalPoint/put", async (req, res) => {
    const { id, totalPoint, point } = await req.body;
    const numTotalPoint = Number(totalPoint)
    const numPoint = Number(point)
    Point.findByIdAndUpdate( id, { $set:
      {
      totalPoint: numTotalPoint + numPoint
      }}, error =>{
      if (error) res.status(500).send()
      else {
        res.status(200).send()
      }
    })
    return app.render(req, res, '/totalPoint', req.query)
  });

  // TargetWeightを更新-PUT
  server.put("/targetWeight/put", async (req, res) => {
    const { id, targetWeight } = await req.body;
    TargetWeight.findByIdAndUpdate( id, { $set:
      {
      targetWeight: targetWeight
      }}, error =>{
      if (error) res.status(500).send()
      else {
        res.status(200).send()
      }
    })
    return app.render(req, res, '/weight', req.query)
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
