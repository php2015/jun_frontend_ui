package cn.javabb.common.util;

import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

public class ThumbnailUtil {

    public static void main(String[] args) {
        try {
            /**
             * 尺寸压缩
             */
            File file = new File("D:/upload/picture/5.jpg");
           Thumbnails.of(file)
                        .scale(1f)
                        .outputQuality(0.5f)
                        .toFile(file);
            
            Thumbnails.of(new File("D:/upload/picture/5.jpg"))
                        .scale(1f)
                        .outputQuality(0.1f)
                        .watermark(Positions.CENTER, ImageIO.read(new File("D:/upload/picture/logo.png")), 0.5f)
                        .toFile(new File("D:/upload/picture/abc_watermark.jpg"));
            
        }
        catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
    }
}
