import downloadFile from './downloadFile'

export default async function downloadProductImages({ fs, children }) {
  let images = []

  children.map((item) => {
    if (item.type !== 'product') {
      return item
    }

    item.variants.map((variant) => {
      const folderPath = `public/static/images${item.path}`
      const fileName = `${variant.sku}.png`
      const filePath = `${folderPath}/${fileName}`
      // const imageSrc = `/images${item.path}/${fileName}`
      if (!fs.existsSync(`${folderPath}/${fileName}`)) {
        images.push({ url: variant.image.url, folderPath, filePath })
        // return { ...variant, image: { ...variant.image, src: imageSrc } }
      }
    })
  })

  if (images.length > 0) {
    await Promise.all(
      images.map((image) => {
        return downloadFile({ fs, url: image.url, folderPath: image.folderPath, filePath: image.filePath })
      }),
    )
  }
  console.info(`Downloaded ${images.length} images`)
}
