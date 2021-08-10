"use strict";
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let help = () => {
  console.log("Help\n");
  console.log("ls -> list directory \n");
  console.log("cd -> change directory \n");
  console.log("mkdir -> create directroy");
};

let cd = (args) => {
  if (args[1] === "..") {
    try {
      let path = process
        .cwd()
        .split("/")
        .map((val) => {
          return val;
        });
      let filterPath = path.filter((e) => {
        return e != "";
      });

      let final = "";
      for (let i = 0; i < filterPath.length; i++) {
        final += path[i] + "/";
      }
      console.log(final);
      process.chdir(final);
    } catch (err) {
      console.error(err.message);
    }
  } else if (args[1].length > 0 && args[1] !== "..") {
    try {
      let path = process.cwd() + "/" + args[1];
      process.chdir(path);
    } catch (err) {
      console.error(err.message);
    }
  }
};

let mkdir = (args) => {
  if (!args[1].includes("/")) {
    try {
      fs.mkdirSync(__dirname + "/" + args[1]);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    try {
      fs.mkdirSync(args[1]);
    } catch (err) {
      console.error(err.message);
    }
  }
};

let ls = (args) => {
  if (args.includes("/")) {
    fs.readdirSync(args[1]).forEach((file) => {
      console.info(file);
    });
  } else if (args.includes(".")) {
    fs.readdirSync("/home/filip").forEach((file) => {
      console.info(file);
    });
  } else if (args.length < 2) {
    fs.readdirSync(process.cwd()).forEach((file) => {
      console.info(file);
    });
  } else {
    try {
      fs.readdirSync("/home/filip/" + args[1]).forEach((file) => {
        console.info(file);
      });
    } catch (err) {
      console.error(err.message);
    }
  }
};

let input = () => {
  rl.question(process.cwd() + "> ", (data) => {
    if (data === "exit") {
      rl.close();
    } else {
      if (data.includes("ls")) {
        let args = data.split(" ").map((val) => {
          return val;
        });
        ls(args);
      } else if (data.includes("mkdir")) {
        let args = data.split(" ").map((val) => {
          return val;
        });
        mkdir(args);
      } else if (data.includes("cd")) {
        let args = data.split(" ").map((val) => {
          return val;
        });
        cd(args);
      } else if (data.includes("help")) {
        help();
      } else {
        console.log("Unknown keyword");
      }
      input();
    }
  });
};

input();

rl.on("close", () => {
  console.log("BYE");
  process.exit(0);
});
