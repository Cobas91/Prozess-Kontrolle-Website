import * as dgapi from "../utils/API/dgapi";

async function checkUser(input) {
  var result = await dgapi.getUsername(input);
  return result;
}

export { checkUser };
