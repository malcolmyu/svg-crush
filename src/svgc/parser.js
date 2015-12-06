import sax from 'sax'

const config = {
  strict: true,
  trim: true,
  normalize: true,
  lowercase: true,
  xmlns: true,
  position: false
};

const parser = sax.parser(config.strict, config);

sax.ondoctype =
  sax.onopentag =
    sax.oncdata =
      sax.onclosetag =
        sax.ontext =
          sax.onerror =
            sax.oncomment = data => console.log(data);

export default function(data) {
  sax.write(data).close();
}