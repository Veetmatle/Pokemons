## Used libs

@tanstack/react-query - data cache from fetch, RAM GC, pagination handling;
@legendapp/list - more optimal than standard list, provides component re-render
@expo-image - more optimal than classic Image from RN

## Code map

`DTO mamping `- /mappers;

`Main list management `-

- {recycleItems={true}} - re-renders components without unmounting.
- EstimatedItemSize for more effective layut handling.
- OnEndReachedThreshold={0.5} as preftch for smoother UI;

`PokemonListItemComponent` -

- React.memo for re-render stop. CPU gets a break.
- transition={300} for smoother experience.
