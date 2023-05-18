export function EmptyMemories() {
  return (
    <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
      <div className="flex flex-1 items-center justify-center">
        <p className="w-[360px] text-center leading-relaxed">
          Você ainda não registrou nenhuma lembrança, começa{' '}
          <a href="" className="underline hover:text-gray-50">
            criar agora
          </a>
          !
        </p>
      </div>
    </div>
  )
}
