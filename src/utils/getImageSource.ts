type GetImageSource = {
  path: string
  fileName: string
}

export default function getImageSource({ path, fileName }: GetImageSource) {
  return `/static/images${path}/${fileName}.png`
}
