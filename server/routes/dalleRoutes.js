import express from 'express'; 
import * as dotenv from 'dotenv'; 
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const router = express.Router(); 

const configuration = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(configuration); 

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
  });
  
  router.route('/').post(async (req, res) => { // man this guy needs to stop copying things from everywhere
    try {
    const {prompt} = req.body; 
    console.log(prompt); 

    const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
      });

      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({photo: image});
    }

    catch(error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }

    // try {
    //   const { prompt } = req.body;
  
    //   const aiResponse = await openai.createImage({
    //     prompt,
    //     n: 1,
    //     size: '1024x1024',
    //     response_format: 'b64_json',
    //   });
  
    //   const image = aiResponse.data.data[0].b64_json;
    //   res.status(200).json({ photo: image });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    // }
  });

export default router; 