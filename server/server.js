const username = "";
const password = "";
const cluster = "Cluster0";
const dbname = "myFirstDatabase";

mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
