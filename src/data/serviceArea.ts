/**
 * ÁREA DE ATENDIMENTO — edite apenas este arquivo para incluir novas
 * cidades e bairros. A informação aparece na home, no rodapé e é usada
 * para validar o pedido no carrinho.
 */
export interface City {
  name: string;
  uf: string;
  neighborhoods: string[];
}

export const serviceArea: { cities: City[]; note?: string } = {
  cities: [
    {
      name: "Pinhais",
      uf: "PR",
      neighborhoods: [
        "Alphaville Graciosa",
        "Alto Tarumã",
        "Atuba",
        "Centro",
        "Emiliano Perneta",
        "Estância Pinhais",
        "Jardim Amélia",
        "Jardim Cláudia",
        "Jardim Karla",
        "Maria Antonieta",
        "Parque das Nascentes",
        "Pineville",
        "Vargem Grande",
        "Weissópolis",
      ],
    },
  ],
  note: "Se seu bairro não está na lista, chama no WhatsApp — a gente vê uma forma de entregar!",
};

export const defaultCity = serviceArea.cities[0];

export function cityLabel(city: City): string {
  return `${city.name} - ${city.uf}`;
}

export function isCovered(cityName: string, neighborhood: string): boolean {
  const city = serviceArea.cities.find((c) => c.name === cityName);
  if (!city) return false;
  return city.neighborhoods.includes(neighborhood);
}
