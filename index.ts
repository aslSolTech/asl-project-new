import { API_PORT, IP_BINDING } from "./src/shared/constant/app/dotenv";
import { server } from "./src/app";

server.listen(API_PORT, IP_BINDING, () => {
  console.log(`Server is running on http://${IP_BINDING}:${API_PORT}`);
});
