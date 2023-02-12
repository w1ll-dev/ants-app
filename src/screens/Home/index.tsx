import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { AntCard, AntCardProps } from '../../components/AntCard';
import { Button } from '../../components';
import { RaceStatus } from '../../constants';
import { generateAntWinLikelihoodCalculator } from '../../domain';
import { getAntsList } from '../../repository';
import { Container, Footer, Separator } from './styles';

export function Home() {
  const [raceGlobalState, setRaceGlobalState] = useState<RaceStatus>(
    RaceStatus.NotYetRun
  );
  const [raceList, setRaceList] = useState<AntCardProps[]>([]);
  const { setOptions } = useNavigation();
  const {
    data: ants,
    refetch,
    isError,
    isLoading
  } = useQuery<Ant[], Error>('load-ants', getAntsList, {
    enabled: false
  });

  const label = useMemo(() => {
    if (isLoading) return 'Loading';

    if (raceGlobalState === RaceStatus.InProgress) return 'Race in Progress';

    if (raceGlobalState === RaceStatus.AllCalculated) return 'Run Again';

    if (raceGlobalState === RaceStatus.NotYetRun && !!ants?.length)
      return 'Start Race';

    if (isError) return 'Error loading ants';

    return 'Load Ants';
  }, [ants?.length, isError, isLoading, raceGlobalState]);

  const sortAntsByWinLikehood = useCallback(
    (currentAnt: Ant, currentWinLikehood: number, antsList: AntCardProps[]) => {
      const newAntsRaceList: AntCardProps[] = antsList.map((antCard) => {
        if (antCard.name === currentAnt.name) {
          antCard.winLikehood = currentWinLikehood;
          antCard.winLikehoodCalcStatus = RaceStatus.AllCalculated;
        }

        return antCard;
      });

      const areAllWinLikehoodCalculated = newAntsRaceList.every(
        (antCard) => antCard.winLikehoodCalcStatus === RaceStatus.AllCalculated
      );

      if (areAllWinLikehoodCalculated)
        setRaceGlobalState(RaceStatus.AllCalculated);

      const sortedAntsRaceList = newAntsRaceList.sort(
        (a, b) => (b.winLikehood ?? 0) - (a.winLikehood ?? 0)
      );

      return sortedAntsRaceList;
    },
    []
  );

  const onStartRace = useCallback(() => {
    if (!ants) return;

    setRaceGlobalState(RaceStatus.InProgress);

    setRaceList((currentRaceList) =>
      currentRaceList.map((antCard) => ({
        ...antCard,
        winLikehood: 0,
        winLikehoodCalcStatus: RaceStatus.InProgress
      }))
    );

    for (const ant of ants) {
      const calculateWinLikehood = generateAntWinLikelihoodCalculator();

      const onCalculateWinLikehood = (winLikehood: number) =>
        setRaceList((currentAntsRaceList) => {
          if (currentAntsRaceList.length === ants.length - 1)
            setRaceGlobalState(RaceStatus.AllCalculated);

          return sortAntsByWinLikehood(ant, winLikehood, currentAntsRaceList);
        });

      calculateWinLikehood(onCalculateWinLikehood);
    }
  }, [ants, sortAntsByWinLikehood]);

  const handlePress = useCallback(() => {
    if (!ants) return refetch();

    onStartRace();
  }, [ants, onStartRace, refetch]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Ant>) => <AntCard {...item} />,
    []
  );

  const renderSeparator = useCallback(() => <Separator />, []);

  useEffect(() => {
    if (!ants?.length) return;

    setRaceList(ants);
  }, [ants]);

  useEffect(() => {
    setOptions({ title: `Race status: ${raceGlobalState}` });
  }, [raceGlobalState, setOptions]);

  return (
    <Container>
      <FlatList
        data={raceList}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
      />
      <Footer>
        <Button
          label={label}
          onPress={handlePress}
          disabled={raceGlobalState === RaceStatus.InProgress}
        />
      </Footer>
    </Container>
  );
}
