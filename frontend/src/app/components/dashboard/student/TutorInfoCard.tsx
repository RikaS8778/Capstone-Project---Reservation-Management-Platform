import Image from 'next/image'

type TutorInfoCardProps = {
  tutorName: string
  tutorMessage: string | null
  tutorPictureUrl: string | null
}

export default function TutorInfoCard({
  tutorName,
  tutorMessage,
  tutorPictureUrl,
}: TutorInfoCardProps) {
  return (
    <div className="flex items-center justify-start bg-white rounded-xl shadow-sm space-x-4 px-6 py-4 w-full max-w-xl mx-auto">
      <Image
        aria-hidden
        src={tutorPictureUrl ?? '/default-avatar.png'}
        alt={`${tutorName}'s profile`}
        width={80}
        height={80}
        className="rounded-full border border-gray-300"
      />
      <div className="flex flex-col space-y-1 ml-2">
        <h2 className="text-lg font-semibold text-gray-800">{tutorName}</h2>
        <p className="text-sm text-gray-600">
          {tutorMessage ?? ' '}
        </p>
      </div>
    </div>
  )
}
