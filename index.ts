import app from "./server";
import { port } from "./config";

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
