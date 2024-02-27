import 'package:amazon_app/constants/global_variables.dart';
import 'package:amazon_app/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class BelowAppBar extends StatelessWidget {
  const BelowAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    var user = Provider.of<UserProvider>(context, listen: false).user;
    var userName =
        "${user.name[0].toUpperCase()}${user.name.substring(1).toLowerCase()}";
    return Container(
      decoration: const BoxDecoration(gradient: GlobalVariables.appBarGradient),
      padding: const EdgeInsets.only(left: 10, right: 10, bottom: 10),
      child: Row(
        children: [
          const Text(
            'Hello, ',
            style: TextStyle(color: Colors.black, fontSize: 22),
          ),
          Text(
            userName,
            style: const TextStyle(
                color: Colors.black, fontSize: 22, fontWeight: FontWeight.w600),
          )
        ],
      ),
    );
  }
}
