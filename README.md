# what-food

> Live at [what-food.surge.sh](https://what-food.surge.sh)!

Determine what food is in a given picture. Inspired by [Silcon Valley](https://www.youtube.com/watch?v=ACmydtFDTGs).

## How?

Using Microsoft's [customvision.ai](https://customvision.ai) service.

1) Train a customvision project on some food types (I used [these images](./ai_training))
2) Configure [bengreenier/customvision-micro](https://github.com/bengreenier/customvision-micro) and run/host it
3) Change `myPredictionServiceUrl` in [this search query](https://github.com/bengreenier/what-food/search?utf8=%E2%9C%93&q=myPredictionServiceUrl)
4) Run (`npm start`) or host (`npm run-script build && copy build/ your-location/`) this frontend
5) Use!

## Why?

Because the show Silicon Valley is awesome, and I recently joined the [PCT](https://github.com/catalystcode) team who specializes
in solving tricky problems, often with Microsoft tech. This project was a way to learn some new skills (customvision, react)
and make something pretty cool in the process.

## License

MIT