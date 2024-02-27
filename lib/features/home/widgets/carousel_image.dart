import 'package:amazon_app/constants/global_variables.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class CarouselImage extends StatelessWidget {
  const CarouselImage({super.key});

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      items: GlobalVariables.carouselImages
          .map(
            (data) => Builder(builder: (context) {
              return Image.network(
                data,
                fit: BoxFit.cover,
                height: 200,
              );
            }),
          )
          .toList(),
      options: CarouselOptions(
        viewportFraction: 1,
        height: 200,
        autoPlay: true,
        autoPlayInterval: const Duration(
          seconds: 3,
        ),
      ),
    );
  }
}
