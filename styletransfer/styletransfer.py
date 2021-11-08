import os
from os import path
from datetime import datetime
import numpy as np
import tensorflow as tf
import tensorflow_hub as tf_hub
import PIL

print('start', datetime.now().strftime("%H:%M:%S"))

print('os getcwd:', os.getcwd())

# decode image detects image file type and convers input bytes 
def load_image(image_path, image_size=(1024, 1024)):
    img = tf.io.decode_image(
      tf.io.read_file(image_path),
      channels=3, dtype=tf.float32)[tf.newaxis, ...]
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=False)
    return img

# need to change this
for x in ['.jpg', '.jpeg', '.png', '.jfif']:
    if path.exists("{0}/images/inputImages/original_image{1}".format(os.getcwd(), x)):
        print("original image exists:")
        original_image = load_image("{0}/images/inputImages/original_image{1}".format(os.getcwd(), x))
    else:
        print("original image does not exist" + x)
        print("{0}/images/inputImages/original_image{1}".format(os.getcwd(), x))
    if path.exists("{0}/images/inputImages/style_image{1}".format(os.getcwd(), x)):
        print("style image exists")
        style_image = load_image("{0}/images/inputImages/style_image{1}".format(os.getcwd(), x))
    else:
        print("style image does not exist" + x)
        print("{0}/images/inputImages/style_image{1}".format(os.getcwd(), x))
    
style_image = tf.nn.avg_pool(style_image, ksize=[3,3], strides=[1,1], padding='VALID')


stylize_model = tf_hub.load('{0}/styletransfer/tf_model'.format(os.getcwd()))

results = stylize_model(tf.constant(original_image), tf.constant(style_image))
stylized_photo = results[0]


def export_image(tf_img):
    tf_img = tf_img*255
    tf_img = np.array(tf_img, dtype=np.uint8)
    if np.ndim(tf_img)>3:
        assert tf_img.shape[0] == 1
        img = tf_img[0]
    return PIL.Image.fromarray(img)

export_image(stylized_photo).save("{0}/images/styledImage/stylized.jpg".format(os.getcwd()))

print('done', datetime.now().strftime("%H:%M:%S"))

def export_to_js(photo):
    return export_image(photo)

export_to_js(stylized_photo)


