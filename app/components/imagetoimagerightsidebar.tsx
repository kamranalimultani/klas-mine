import Image from 'next/image';

const data = [
  {
    title: 'Photo Frame',
    images: [
      '/assets/images/frame01.jpg', '/assets/images/frame02.jpg', '/assets/images/frame03.jpg', '/assets/images/frame04.jpg'
    ]
  },
  {
    title: 'Mug',
    images: [
      '/assets/images/mug01.jpg', '/assets/images/mug02.jpg', '/assets/images/mug03.jpg', '/assets/images/mug04.jpg'
    ]
  },
  {
    title: 'Wall Painting',
    images: [
      '/assets/images/painting01.jpg', '/assets/images/painting02.jpg', '/assets/images/painting03.jpg', '/assets/images/painting04.jpg'
    ]
  }
];

export default function ImageToImagerRghtSidebar() {
  return (
    <div className="mx-auto px-4 py-8 h-[calc(100vh-65px)] overflow-y-scroll">
      <h1 className="text-2xl font-semibold mb-2">Article</h1>
      <hr className="mb-6" />

      {data.map((section, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-xl font-medium mb-4">{section.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {section.images.map((src, idx) => (
              <div key={idx} className="aspect-[4/3] relative w-full">
                <Image
                  src={src}
                  alt={section.title + ' ' + (idx + 1)}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md shadow"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button className="border border-purple-500 text-purple-600 px-6 py-3 rounded-full hover:bg-purple-100 transition">
          View All
        </button>
      </div>
    </div>
  );
}
