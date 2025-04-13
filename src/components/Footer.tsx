export const Footer = () => {
  return (
    <div class="flex h-full p-2 items-center justify-around">
      <img className="h-full" src="/assets/appicon.webp" alt="Logo de Rock Paper Chiappa" />
      <div className="w-full h-full flex flex-col items-end justify-center font-mono">
        <span>
          coded by
          <a
            className="font-bold ml-2"
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://github.com/genadeev"
          >
            gena
          </a>
        </span>
        <a
          className="font-bold"
          href="https://comidolar.com.ar/donaciones"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          donate
        </a>
      </div>
    </div>
  );
};
