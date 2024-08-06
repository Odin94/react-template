import { AppShell, Burger, Button, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useQuery } from "@tanstack/react-query"
import "./App.css"
import viteLogo from "/vite.svg"

function App() {
    const [opened, { toggle }] = useDisclosure()
    const { data, isFetching, error } = useQuery({ queryKey: ["ditto"], queryFn: fetchPokemon })

    console.log(data)
    return (
        <AppShell
            header={{ height: 80 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header p={"lg"}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Text>NavBar 1</Text>
                <Text>NavBar 2</Text>
                <Text>NavBar 3</Text>
                <Button>Test</Button>
            </AppShell.Navbar>

            <AppShell.Main>
                <Title>Mantine Template</Title>

                {isFetching ? <Text>Fetching...</Text> : null}
                {error ? <Text>Error: {error.message}</Text> : null}
                {data ? <Text>Ditto's moves as fetched from API: {data.abilities.map((m) => m.ability.name).join(", ")}</Text> : null}
            </AppShell.Main>

            <AppShell.Aside p="md">Aside</AppShell.Aside>
            <AppShell.Footer p="md">Footer</AppShell.Footer>
        </AppShell>
    )
}

type Pokemon = {
    abilities: { ability: { name: string } }[]
}

async function fetchPokemon(): Promise<Pokemon> {
    const url = "https://pokeapi.co/api/v2/pokemon/ditto"

    const res = await fetch(url)
    return res.json()
}

export default App
