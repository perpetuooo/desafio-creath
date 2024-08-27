import prisma from "../utils/prisma";

async function seedBarbers() {
    const barbers = [
        { name: 'Alexandre Soares', phone: '999212', password: 'senha1' },
        { name: 'Paula Souza', phone: '123456', password: 'senha2' },
        { name: 'Victor Moreira', phone: '123464566', password: 'senha2' },
        { name: 'Agatha Silva', phone: '124223', password: 'senha2' },
        { name: 'Emanoel Lucas', phone: '12345698', password: 'senha2' },
        { name: 'Karine Barros', phone: '123454555556', password: 'senha2' },
    ];

    for (const barber of barbers) {
        await prisma.barber.create({
            data: {
                name: barber.name,
                phone: barber.phone,
                password: barber.password,
            },
        });
    }
}

seedBarbers()
    .then(() => console.log('Barbeiros seedados com sucesso!'))
    .catch((error) => console.error('Erro ao seedar barbeiros:', error))
    .finally(() => process.exit());
