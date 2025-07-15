// src/app/http-loader.factory.ts
import { HttpClient }                   from '@angular/common/http';
import { TranslateHttpLoader }          from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',   // ruta donde guardas tus JSON de idioma
    '.json'             // extensión de los archivos
  );
}
