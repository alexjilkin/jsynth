const attackSize = 1000;
const releaseSize = 10000;

export const envelope = (u, n, shouldGenerate, nAtStart, nAtStop) => {
  const nSinceStart = n - nAtStart;
  if (nSinceStart < attackSize) {
    return envelopeAttack(u, nSinceStart, attackSize);
  }

  if (!shouldGenerate) {
    const nSinceStop = n - nAtStop;
    if (nSinceStop > releaseSize) {
      return 0;
    }

    return envelopeRelease(u, nSinceStop, releaseSize);
  }

  return u;
};

const envelopeAttack = (y, x, size) => {
  const m = 1 / size;
  return y * (x * m);
};

const envelopeRelease = (y, x, size) => {
  const m = -1 / size;

  return y * (x * m + 1);
};
