package com.jeasy.collection;

import java.util.Comparator;

/**
 * @author taomk
 * 按Pair的第二个元素的比较器
 * @param <T>
 */
public class PairSecondElemComparator<T extends Comparable<T>> implements Comparator<Pair<?, T>> {

    @Override
    public int compare(Pair<?, T> o1, Pair<?, T> o2) {
        if (o1 == null && o2 == null) {
            return 0;
        }
        else if (o1 == null) {
            return -o2.getSecond().compareTo(null);
        }
        else if (o2 == null) {
            return o1.getSecond().compareTo(null);
        }
        else {
            return o1.getSecond().compareTo(o2.getSecond());
        }
    }

    public static <T1> Comparator<Pair<?, T1>> getInstance(final Comparator<T1> comparator) {
        if (comparator == null) {
            throw new IllegalArgumentException("comparator can not be null!");
        }
        return new Comparator<Pair<?, T1>>() {
            @Override
            public int compare(Pair<?, T1> o1, Pair<?, T1> o2) {
                if (o1 == null && o2 == null) {
                    return 0;
                }
                else if (o1 == null) {
                    return comparator.compare(null, o2.getSecond());
                }
                else if (o2 == null) {
                    return comparator.compare(o1.getSecond(), null);
                }
                else {
                    return comparator.compare(o1.getSecond(), o2.getSecond());
                }
            }
        };
    }

}
