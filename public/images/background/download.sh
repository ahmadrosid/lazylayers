#!/bin/bash

# Define an array of image URLs
image_urls=(
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-001.jpg'
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-002.jpg'
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-003.jpg'
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-004.jpg'
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-005.jpg'
  'https://gradient.page//samples/vibrant-vista/vibrant-vista-006.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-001.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-002.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-003.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-004.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-005.jpg'
  'https://gradient.page//samples/deep-dusk/deep-dusk-006.jpg'
  'https://gradient.page//samples/green-glory/green-glory-001.jpg'
  'https://gradient.page//samples/green-glory/green-glory-002.jpg'
  'https://gradient.page//samples/green-glory/green-glory-003.jpg'
  'https://gradient.page//samples/green-glory/green-glory-004.jpg'
  'https://gradient.page//samples/green-glory/green-glory-005.jpg'
  'https://gradient.page//samples/green-glory/green-glory-006.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-001.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-002.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-003.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-004.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-005.jpg'
  'https://gradient.page//samples/beautiful-blue/beautiful-blue-006.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-001.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-002.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-003.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-004.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-005.jpg'
  'https://gradient.page//samples/pretty-in-pink/pretty-in-pink-006.jpg'
)

# Loop through the array and download each image
for url in "${image_urls[@]}"; do
  wget "$url"
done
