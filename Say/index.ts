import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as Jimp from 'jimp';
import fetch from 'node-fetch';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

        const urlResp = await fetch("https://api.thecatapi.com/v1/images/search?format=json", {
            method: 'GET',
            headers: {
                'x-api-key': process.env["CAT_KEY"]
            }
        });
        
        const catData = await urlResp.json();
        const imgPath = catData[0].url;
  
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        var text = req.query.text ?? '';

        const newImageBytes = await Jimp.read(imgPath).then(img => {
            return img
               .print(
                font,
                0,
                0,   {
                    text: text,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
                  },
                  catData[0].width,
                  catData[0].height
              )
              .getBufferAsync(Jimp.MIME_JPEG);  
          })
          .catch(err => {
            console.error(err);
          });

    context.res = {
        headers:{"content-type":"image/jpg"},
        body: newImageBytes
    };

};

export default httpTrigger;