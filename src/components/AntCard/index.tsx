import { useMemo } from 'react';
import { View } from 'react-native';
import { RaceStatus } from '../../constants';
import { AntInfo } from '../../styles/typography';
import AntProfile from '../AntProfile';
import { Container, Profile } from './styles';

export interface AntCardProps extends Ant {
  winLikehood?: number;
  winLikehoodCalcStatus?: RaceStatus;
}

export function AntCard({
  name,
  color,
  length,
  weight,
  winLikehood,
  winLikehoodCalcStatus = RaceStatus.NotYetRun
}: AntCardProps) {
  const winLikehoodLabel = useMemo(() => {
    if (winLikehood) return `${(winLikehood * 100)?.toFixed(2)}%`;

    return winLikehoodCalcStatus;
  }, [winLikehood, winLikehoodCalcStatus]);

  return (
    <Container>
      <Profile>
        <AntProfile color={color} height={70} />
      </Profile>
      <View>
        <AntInfo>
          Name: <AntInfo>{name}</AntInfo>
        </AntInfo>
        <AntInfo>
          Win Likehood: <AntInfo>{winLikehoodLabel}</AntInfo>
        </AntInfo>
        <AntInfo>
          Wheight: <AntInfo>{weight}</AntInfo>
        </AntInfo>
        <AntInfo>
          Color: <AntInfo>{color}</AntInfo>
        </AntInfo>
        <AntInfo>
          Length: <AntInfo>{length}</AntInfo>
        </AntInfo>
      </View>
    </Container>
  );
}
